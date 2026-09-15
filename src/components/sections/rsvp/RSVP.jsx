/** @format */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import {
  Send,
  MessageSquareHeart,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { useRSVP } from "@/hooks/useRSVP";
import AttendanceToggle from "./AttendanceToggle";
import SuccessToast from "./SuccessToast";
import MessageCard from "./MessageCard";
import Pagination from "./Pagination";
import { ScrollReveal } from "@/lib/animations";

export default function RSVP() {
  const {
    form,
    submissions,
    paginatedSubmissions,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    isSubmitting,
    showSuccess,
    validationError,
    isLoading,
    isPaginating,
    lastUpdate,
    updateField,
    handleAttendanceChange,
    handleSubmit,
    refreshData,
  } = useRSVP();

  return (
    <>
      <section id="rsvp" className="min-h-screen py-10 pb-0 relative scroll-mt-6">
        <div className="container max-w-lg space-y-10">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center space-y-2">
              <Typography
                variant="muted"
                className="text-[11px] font-medium tracking-[0.22em] uppercase"
              >
                Konfirmasi Kehadiran
              </Typography>
              <Typography
                variant="h2"
                className="text-accent font-playfair text-[2.6rem] font-normal leading-tight"
              >
                RSVP
              </Typography>
              <Typography
                variant="p"
                className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed"
              >
                Mohon konfirmasi kehadiran Anda agar kami dapat mempersiapkan
                acara dengan sebaik mungkin.
              </Typography>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal>
            <Card className="border-primary-foreground shadow-sm rounded-xl">
              <CardContent className="p-6 space-y-5">
                {showSuccess && <SuccessToast />}
                {validationError && (
                  <div className="flex items-center gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                    <span>{validationError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nama */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-[11px] font-medium tracking-widest"
                    >
                      Nama
                    </Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama Anda"
                      value={form.name}
                      onChange={(e) => updateField("name")(e.target.value)}
                      className="h-10"
                    />
                  </div>

                  {/* Kehadiran */}
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-medium tracking-widest">
                      Kehadiran
                    </Label>
                    <AttendanceToggle
                      value={form.attendance}
                      onChange={handleAttendanceChange}
                    />
                  </div>

                  {/* Jumlah Tamu */}
                  {form.attendance === "hadir" && (
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-medium tracking-widest">
                        Jumlah Tamu
                      </Label>
                      <Select
                        value={form.guests}
                        onValueChange={updateField("guests")}
                      >
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder="Pilih jumlah tamu" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n} Orang
                            </SelectItem>
                          ))}
                          <SelectItem value="lebih_dari_5">
                            Lebih dari 5 Orang
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Ucapan */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      className="text-[11px] font-medium tracking-widest"
                    >
                      Ucapan & Doa
                      <span className="ml-1.5 font-normal normal-case tracking-normal text-muted-foreground">
                        (opsional)
                      </span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tuliskan doa dan harapan untuk kedua mempelai…"
                      value={form.message}
                      onChange={(e) => updateField("message")(e.target.value)}
                      rows={3}
                      className="resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 text-sm font-medium tracking-widest"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" />
                        Mengirim…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-3.5 w-3.5" />
                        Kirim RSVP
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Submissions */}
          <ScrollReveal>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <MessageSquareHeart className="h-3.5 w-3.5" />
                    <Typography
                      variant="muted"
                      className="text-[11px] font-medium tracking-widest uppercase whitespace-nowrap mt-0"
                    >
                      {submissions.length} Ucapan
                    </Typography>
                    <Button
                      variant="ghost"
                      onClick={refreshData}
                      disabled={isLoading}
                      className="p-1 rounded-md hover:bg-transparent transition-colors disabled:opacity-50"
                      title="Refresh data"
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                      />
                    </Button>
                  </div>
                  {lastUpdate && (
                    <Typography variant="muted" className="text-[9px] mt-0">
                      Auto-refresh: {lastUpdate.toLocaleTimeString("id-ID")}
                    </Typography>
                  )}
                </div>
                <Separator className="flex-1" />
              </div>

              {/* Loading State */}
              {isLoading && submissions.length === 0 ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Card
                      key={i}
                      className="border-primary-foreground shadow-sm animate-pulse"
                    >
                      <CardContent className="p-4 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                        <div className="h-3 bg-muted rounded w-full"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : submissions.length === 0 ? (
                /* Empty State */
                <Card className="border-primary-foreground shadow-sm">
                  <CardContent className="p-8 text-center">
                    <MessageSquareHeart className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
                    <Typography
                      variant="p"
                      className="text-sm text-muted-foreground"
                    >
                      Belum ada ucapan dan doa.
                    </Typography>
                    <Typography
                      variant="muted"
                      className="text-xs text-muted-foreground/70 mt-1"
                    >
                      Jadilah yang pertama memberikan ucapan!
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                /* Messages with Pagination */
                <>
                  {isPaginating ? (
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Card
                          key={i}
                          className="border-primary-foreground shadow-sm animate-pulse"
                        >
                          <CardContent className="p-4 space-y-2">
                            <div className="h-4 bg-muted rounded w-1/3"></div>
                            <div className="h-3 bg-muted rounded w-full"></div>
                            <div className="h-3 bg-muted rounded w-2/3"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {paginatedSubmissions.map((s, i) => (
                        <MessageCard key={s.id} submission={s} index={i} />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                    onNext={nextPage}
                    onPrev={prevPage}
                  />
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
