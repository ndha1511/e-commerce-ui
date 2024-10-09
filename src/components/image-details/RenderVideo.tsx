

const RenderVideo = (props: any) => {
    return (
        
          <video
            width="100%"
            height="400px"
            src={props.embedUrl}
            autoPlay
            controls
            muted
          />
      );
}

export default RenderVideo;