export default function Preview({ preview, imageSrc }) {
  if (preview) {
    return (
      <>
        <div className="previewDiv">
          {imageSrc && (
            <img className="image-preview" src={imageSrc} alt="img" />
          )}
        </div>
      </>
    );
  }
  return <div></div>;
}
