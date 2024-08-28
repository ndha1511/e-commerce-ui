// import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";

// type Image = {
//   id: number;
//   path: string;
// };

// export type Props = {
//   images: Image[];
// };

// function ImageDetails({ images }: Props) {
//   const [active, setActive] = useState<number>(0);
//   const [smallActive, setSmallActive] = useState<number>(0);

//   const smallImagesToShow = 5; // Số hình ảnh nhỏ hiển thị cùng một lúc
//   const imageWidth = 76; // Kích thước mỗi ảnh nhỏ (bao gồm cả khoảng cách giữa các ảnh)

//   const nextSmallImage = () => {
//     if (active + 1 < images.length) {
//       setActive(active + 1);
//       // Chỉ cuộn khi active vượt qua số ảnh có thể hiển thị cùng lúc
//       if (active >= smallImagesToShow - 1) {
//         setSmallActive(smallActive + 1);
//       }
//     }
//   };

//   const prevSmallImage = () => {
//     if (active > 0) {
//       setActive(active - 1);
//       // Chỉ cuộn khi active nhỏ hơn vị trí smallActive
//       if (active <=  images.length - smallImagesToShow) {
//         setSmallActive(smallActive - 1);
//       }
//     }
//   };

//   return (
//     <div style={{ width: "100%", flex: 1 }}>
//       <div
//         style={{
//           width: "100%",
//           height: "500px",
//           overflow: "hidden",
//         }}
//       >
//         <div className="border border-radius-small" style={{padding:10, width:'100%' }}>
//           <div
//             style={{
//               display: "flex",
//               transition: "transform 0.5s ease",
//               transform: `translateX(-${active * 100}%)`,

//             }}
//           >
//             {images.map((image) => (
//               <img
//                 key={image.id}
//                 src={image.path || ""}

//                 style={{ width: "100%", height: "400px", flexShrink: 0 }}
//               />
//             ))}
//           </div>
//           <div
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               color: "#fff",
//               background: "rgba(0,0,0,0.5)",
//               borderRadius: "0px 5px 0px 0px",
//             }}
//           >
//             {active + 1}/{images.length}
//           </div>
//         </div>
//         <div
//           style={{
//             position: "relative",
//             overflow: "hidden",
//             marginTop: "8px",
//             width: "auto",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               gap: "6.5px",
//               transition: "transform 0.5s ease",
//               transform: `translateX(-${smallActive * imageWidth}px)`, // Cuộn theo giá trị smallActive
//             }}
//           >
//             {images.map((image, index) => (
//               <img
//                 key={image.id}
//                 src={image.path || ""}
//                 alt="image"
//                 style={{
//                   height: "70px",
//                   width: "70px",
//                   cursor: "pointer",
//                   border:
//                     active === index
//                       ? "2px solid red"
//                       : "2px solid transparent",
//                 }}
//                 onClick={() => {
//                   setActive(index);
//                   if (index >= smallImagesToShow) {
//                     setSmallActive(index - smallImagesToShow + 1);
//                   } else {
//                     setSmallActive(0);
//                   }
//                 }}
//               />
//             ))}
//           </div>
//           {active + 1 < images.length && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: "40%",
//                 right: 0,
//                 zIndex: 2,
//                 color: "#fff",
//                 background: "rgba(0,0,0,0.5)",
//                 transition: "background-color 1.5s ease-in-out",
//                 cursor: "pointer",
//                 padding: "5px",
//               }}
//               onClick={nextSmallImage}
//             >
//               <FontAwesomeIcon icon={faChevronRight} />
//             </div>
//           )}
//           {active > 0 && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: "40%",
//                 left: 0,
//                 zIndex: 2,
//                 color: "#fff",
//                 background: "rgba(0,0,0,0.5)",
//                 transition: "background-color 1.5s ease-in-out",
//                 cursor: "pointer",
//                 padding: "5px",
//               }}
//               onClick={prevSmallImage}
//             >
//               <FontAwesomeIcon icon={faChevronLeft} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ImageDetails;

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageGallery from "react-image-gallery";

type Image = {
    id: number,
    original: string;
    thumbnail: string;
    embedUrl?: string;
};

export type Props = {
    images: Image[];
};
const ImageDetails = ({ images }: Props) => (
    <div style={{ width: "100%", flex: 1 }}>
        <ImageGallery  renderLeftNav={(onClick, disabled) => {
            return (
                <button className="image-gallery-icon image-gallery-left-nav text-large"
                    onClick={onClick} disabled={disabled} ><FontAwesomeIcon icon={faChevronLeft} /></button>)
        }}
            renderRightNav={(onClick, disabled) => {
                return (
                    <button className="image-gallery-icon image-gallery-right-nav text-large"
                        onClick={onClick} disabled={disabled} ><FontAwesomeIcon icon={faChevronRight} /></button>)
            }}
            items={images} />
    </div>
);
export default ImageDetails;
