import { Carousel } from 'antd';
import Offers from '../features/home/Offers';

const contentStyle = {
    height: '500px',
  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#364d79',
};

const images = [
    { src: 'https://bmdvdmtbaszopphdiwot.supabase.co/storage/v1/object/public/products/13de10d4-f03b-4247-a75a-ce350ffd0e8e.jpg', alt: 'Slide 1' },
    { src: 'https://bmdvdmtbaszopphdiwot.supabase.co/storage/v1/object/public/products/60055a28-ad35-4b42-9d35-19bb6e460ef6.jpg', alt: 'Slide 2' },
    { src: 'https://bmdvdmtbaszopphdiwot.supabase.co/storage/v1/object/public/products/a23577c0-9213-445a-81b4-fd6b26e6c4b3.jpg', alt: 'Slide 3' },
    { src: 'https://bmdvdmtbaszopphdiwot.supabase.co/storage/v1/object/public/products/deed6555-fbeb-4eb7-9dc3-36e1ff402cc2.jpg', alt: 'Slide 4' },
    { src: 'https://bmdvdmtbaszopphdiwot.supabase.co/storage/v1/object/public/products/f6c80a15-1d1d-4a8f-a3a0-df61efe08595.jpg', alt: 'Slide 5' },
    { src: 'https://bmdvdmtbaszopphdiwot.supabase.co/storage/v1/object/public/products/045ae3b4-5ee7-48a7-9041-3bbc0e0b633f.jpg', alt: 'Slide 6' },
];

const CustomCarousel = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '550px' }}>
            {/* Offers Component on the left */}
            {/* <div className='ml-[8rem] ' >
                <Offers />
            </div> */}

            {/* Carousel on the right */}
            <div style={{ width: '100%', height: '550px' }}>
                <Carousel autoplay dotPosition="bottom" effect="fade" style={{ height: '100%' }}>
                    {images.map((image, index) => (
                        <div key={index} style={contentStyle}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                style={{
                                    width: '100%', 
                                    height: '600px', 
                                    objectFit: 'auto', 
                                    borderRadius: '10px'
                                    
                                }}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default CustomCarousel;
