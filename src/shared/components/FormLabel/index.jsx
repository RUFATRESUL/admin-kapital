import RenderIf from "../RenderIf";
import styles from "./FormLabel.module.scss";
const FormLabel = ({ text, isRequired }) => {
  return (
    <>
      <label className={styles.FormLabel}>
        {text}
   
          <span> {isRequired} </span>
      
      </label>
    </>
  );
};

export default FormLabel;
