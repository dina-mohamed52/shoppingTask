 

const images = [
  { src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575082/468185339_931536052403792_3120323499499149723_n_zp0ej5.jpg", alt: "Slide 1" },
//   { src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575082/468185339_931536052403792_3120323499499149723_n_zp0ej5.jpg", alt: "Slide 2" },
  { src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756578818/5879927343848475497_f2vrqs.jpg", alt: "Slide 2" },
  { src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756578733/5879927343848475501_heygzw.jpg", alt: "Slide 3" },
  { src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756578733/5879927343848475498_hbb6kj.jpg", alt: "Slide 4" },
  { src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575014/468075933_931535155737215_2422425145619665420_n_r6ulp9.jpg", alt: "Slide 5" },
];

const CustomCarousel = () => {
  return (
    <div className="w-full max-w-[95vw] mx-auto  h-[70vh]">
      <Carousel autoplay dotPosition="bottom" effect="fade" className="h-full">
        {images.map((image, index) => (
          <div key={index} className="flex justify-center items-center sm:h-[500px] h-[394px] rounded-md bg-gray-100">
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[35rem] w-full object-contain rounded-xl shadow-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;  