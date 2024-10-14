const RenderImage = (props: any) => {
    return (
        <img src={props.original}
        style={{ width: "100%", height: "auto" }}/>
      );
}

export default RenderImage;