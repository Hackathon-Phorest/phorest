import PhotoCell from "./PhotoCell";
import styles from "../styles/PhotoGrid.module.css";
import xImg from "../assets/X_white.png";

const PhotoGrid = ({ photos, selectedPhotoIndex, onPhotoClick }) => {
  return (
    <div className={styles.photoGrid}>
      <PhotoCell
        src={xImg}
        isSelected={0 === selectedPhotoIndex}
        onClick={() => onPhotoClick(0)}
      />
      {photos.map((item, index) => (
        <PhotoCell
          key={index + 1}
          src={`http://${item.image}`}
          isSelected={index + 1 === selectedPhotoIndex}
          onClick={() => onPhotoClick(index + 1, `http://${item.image}`)}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
