/** @format */

import Typography from "../../ui/typography";
import { Button } from "../../ui/button";
import WaveShape4 from "../../shapes/WaveShape4";
import WaveShape5 from "../../shapes/WaveShape5";
import { useGallery } from "@/hooks/useGallery";
import ImageGrid from "./ImageGrid";
import ImageModal from "./ImageModal";

// Gallery images import
import gallery1 from "@/assets/image/gallery/gallery(1).jpg";
import gallery2 from "@/assets/image/gallery/gallery(2).jpg";
import gallery3 from "@/assets/image/gallery/gallery(3).jpg";
// import gallery4 from "@/assets/image/gallery/gallery(4).jpg";
import gallery5 from "@/assets/image/gallery/gallery(5).jpg";
import gallery6 from "@/assets/image/gallery/gallery(6).jpg";
import gallery7 from "@/assets/image/gallery/gallery(7).jpg";
// import gallery8 from "@/assets/image/gallery/gallery(8).jpg";
// import gallery9 from "@/assets/image/gallery/gallery(9).jpg";
// import gallery10 from "@/assets/image/gallery/gallery(10).jpg";
// import gallery11 from "@/assets/image/gallery/gallery(11).jpg";
// import gallery12 from "@/assets/image/gallery/gallery(12).jpg";
import gallery13 from "@/assets/image/gallery/gallery(13).jpg";
import gallery14 from "@/assets/image/gallery/gallery(14).jpg";
import gallery15 from "@/assets/image/gallery/gallery(15).jpg";
import gallery16 from "@/assets/image/gallery/gallery(16).jpg";
import gallery17 from "@/assets/image/gallery/gallery(17).jpg";
import gallery18 from "@/assets/image/gallery/gallery(18).jpg";
import gallery19 from "@/assets/image/gallery/gallery(19).jpg";
// import gallery20 from "@/assets/image/gallery/gallery(20).jpg";
// import gallery21 from "@/assets/image/gallery/gallery(21).jpg";
import gallery22 from "@/assets/image/gallery/gallery(22).jpg";
import gallery23 from "@/assets/image/gallery/gallery(23).jpg";
import gallery24 from "@/assets/image/gallery/gallery(24).jpg";
import gallery25 from "@/assets/image/gallery/gallery(25).jpg";
import gallery26 from "@/assets/image/gallery/gallery(26).jpg";
import gallery27 from "@/assets/image/gallery/gallery(27).jpg";
import gallery28 from "@/assets/image/gallery/gallery(28).jpg";
import gallery40 from "@/assets/image/gallery/gallery(40).jpg";
import gallery42 from "@/assets/image/gallery/gallery(42).jpg";
import gallery44 from "@/assets/image/gallery/gallery(44).jpg";
import gallery46 from "@/assets/image/gallery/gallery(46).jpg";
import gallery47 from "@/assets/image/gallery/gallery(47).jpg";

const Gallery = () => {
  // Gallery images array
  const galleryImages = [
    gallery17,
    // gallery4,
    gallery22,
    // gallery9,
    gallery27,
    gallery1,
    gallery13,
    gallery25,
    gallery46,
    gallery6,
    gallery19,
    gallery42,
    gallery3,
    gallery14,
    // gallery8,
    // gallery21,
    // gallery11,
    gallery28,
    gallery2,
    gallery24,
    gallery7,
    gallery44,
    gallery16,
    // gallery10,
    gallery5,
    gallery23,
    gallery40,
    // gallery12,
    // gallery20,
    gallery26,
    gallery47,
    gallery15,
    gallery18,
  ];

  // Use custom hook for all gallery logic
  const {
    showAll,
    displayedImages,
    hasMoreImages,
    toggleShowAll,
    isModalOpen,
    selectedImageIndex,
    openImage,
    closeModal,
    goToPrevious,
    goToNext,
    zoom,
    position,
    isDragging,
    handleWheel,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDownload,
  } = useGallery(galleryImages, 10);

  return (
    <>
      <section>
        <WaveShape4 rotate={true} fillColors="fill-primary/5" />
        <div className="container bg-primary/5 py-5">
          <Typography
            variant="h5"
            className="text-center font-medium uppercase tracking-[0.35em] sm:tracking-[0.45em] text-accent mb-8"
          >
            Foto Galeri
          </Typography>

          {/* Image Grid */}
          <ImageGrid images={displayedImages} onImageClick={openImage} />

          {/* Show More/Less Button */}
          {hasMoreImages && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={toggleShowAll}
                variant="ghost"
                className="hover:bg-transparent hover:underline text-accent!"
              >
                {showAll
                  ? "Tampilkan Lebih Sedikit"
                  : `Lihat ${galleryImages.length - 10} Foto Lainnya`}
              </Button>
            </div>
          )}
        </div>
        <WaveShape5 fillColors="fill-primary/5" />
      </section>

      {/* Image Modal with Carousel */}
      <ImageModal
        isOpen={isModalOpen}
        selectedIndex={selectedImageIndex}
        images={galleryImages}
        zoom={zoom}
        position={position}
        isDragging={isDragging}
        onClose={closeModal}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onDownload={handleDownload}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </>
  );
};

export default Gallery;
