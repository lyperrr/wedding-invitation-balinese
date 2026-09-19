/** @format */

import { useState, useEffect, useCallback } from "react";
import {
  fetchSubmissions,
  submitRSVP,
  loadSubmissions,
  saveSubmissions,
  clearSubmissions,
} from "@/lib/rsvpApi";
import { useUrlParams } from "./useUrlParams";

const ITEMS_PER_PAGE = 5;

// Helper untuk mengecek apakah nama pengirim adalah ArtDevata
export const isPinnedName = (name) => {
  if (!name) return false;
  const clean = name.trim().toLowerCase().replace(/[\s._-]/g, "");
  return clean === "artdevata";
};

// Helper untuk menyortir data agar pesan yang di-pin selalu di urutan paling atas
export const sortSubmissionsWithPinned = (items) => {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => {
    const aPinned = isPinnedName(a.name);
    const bPinned = isPinnedName(b.name);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0;
  });
};

export const useRSVP = () => {
  const { guestName } = useUrlParams();

  // Initialize form dengan nama dari URL jika ada
  const INITIAL_FORM = {
    name: guestName || "",
    attendance: "",
    guests: "",
    message: "",
  };

  const [form, setForm] = useState(INITIAL_FORM);
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaginating, setIsPaginating] = useState(false);

  // Helper to update form field
  const updateField = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (validationError) setValidationError(null);
  };

  // Handle attendance change
  const handleAttendanceChange = (value) => {
    setForm((prev) => ({
      ...prev,
      attendance: value,
      guests: value === "tidak_hadir" ? "" : prev.guests,
    }));
    if (validationError) setValidationError(null);
  };

  // Refresh data from spreadsheet
  const refreshData = useCallback(async () => {
    console.log("🔄 Starting refresh...");
    setIsLoading(true);

    try {
      const spreadsheetData = await fetchSubmissions();

      if (spreadsheetData !== null) {
        console.log("✅ Fetch successful! Data count:", spreadsheetData.length);
        const sorted = sortSubmissionsWithPinned(spreadsheetData);
        setSubmissions(sorted);

        if (sorted.length > 0) {
          saveSubmissions(sorted);
          console.log("💾 Saved to localStorage");
        } else {
          console.log("📭 Spreadsheet is empty");
          clearSubmissions();
        }
      } else {
        console.warn("⚠️ Fetch failed! Using localStorage as fallback");
        const localData = loadSubmissions();
        console.log("📦 Loaded from localStorage:", localData.length);
        setSubmissions(sortSubmissionsWithPinned(localData));
      }
    } catch (error) {
      console.error("❌ Error in refreshData:", error);
      const localData = loadSubmissions();
      console.log("📦 Emergency fallback to localStorage:", localData.length);
      setSubmissions(sortSubmissionsWithPinned(localData));
    } finally {
      setIsLoading(false);
      setLastUpdate(new Date());
    }
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);

    // Form Validation
    if (!form.name.trim()) {
      setValidationError("Silakan isi nama Anda terlebih dahulu.");
      return;
    }
    if (!form.attendance) {
      setValidationError("Silakan pilih konfirmasi kehadiran.");
      return;
    }
    if (form.attendance === "hadir" && !form.guests) {
      setValidationError("Silakan pilih jumlah tamu yang akan hadir.");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await submitRSVP(form);

      if (success) {
        // Add to local state immediately for better UX with pin sorting
        setSubmissions((prev) =>
          sortSubmissionsWithPinned([
            {
              id: Date.now(),
              ...form,
              timestamp: new Date().toLocaleString("id-ID"),
            },
            ...prev,
          ]),
        );

        // Reset form tapi pertahankan nama dari URL
        setForm({
          name: guestName || "",
          attendance: "",
          guests: "",
          message: "",
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);

        // Refresh from spreadsheet after 2 seconds
        setTimeout(() => refreshData(), 2000);
      } else {
        alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("🔄 Auto-refresh triggered");
      refreshData();
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [refreshData]);

  // Auto-sync to localStorage when submissions change
  useEffect(() => {
    if (submissions.length > 0) {
      saveSubmissions(submissions);
    }
  }, [submissions]);

  // Pagination calculations
  const totalPages = Math.ceil(submissions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSubmissions = submissions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setIsPaginating(true);
    setTimeout(() => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
      setIsPaginating(false);
    }, 300);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setIsPaginating(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsPaginating(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setIsPaginating(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsPaginating(false);
      }, 300);
    }
  };

  return {
    // State
    form,
    submissions,
    isSubmitting,
    showSuccess,
    validationError,
    isLoading,
    isPaginating,
    lastUpdate,

    // Pagination
    paginatedSubmissions,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,

    // Actions
    updateField,
    handleAttendanceChange,
    handleSubmit,
    refreshData,

    // Computed
    isFormValid:
      form.name.trim() &&
      form.attendance &&
      (form.attendance !== "hadir" || form.guests),
  };
};
