import React from 'react';
import ReactPlayer from 'react-player';
import styles from './PostPreview.module.css';
import { usePostContext } from '@/hooks/usePostContext';
import { Waypoint } from 'react-waypoint';

interface PostPreviewProps {
  isPostPage?: boolean;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ isPostPage = false }) => {
  const { is_video, preview, media } = usePostContext();

  const [imageSrc] = preview?.images || [];

  const [videoSrc, setVideoSrc] = React.useState<string | undefined>('');

  React.useEffect(() => {
    is_video ? setVideoSrc(media?.reddit_video.hls_url) : () => {};
  }, []);

  const [shouldPlay, setShouldPlay] = React.useState(false);

  function handleEnterViewport() {
    setShouldPlay(true);
  }

  function handleLeaveViewport() {
    setShouldPlay(false);
  }

  if (!preview) return null;

  if (isPostPage && is_video)
    return (
      <Waypoint onEnter={handleEnterViewport} onLeave={handleLeaveViewport}>
        <div className={styles.wrapper}>
          <div className={styles.blurBackground} style={{ backgroundImage: `url(${imageSrc?.resolutions[0].url})` }}></div>
          <img className={styles.previewPage} src={imageSrc?.source.url} alt='Post preview' />
          <ReactPlayer
            className={styles.videoWrapper}
            light={true}
            playing={shouldPlay}
            url={videoSrc}
            width={'100%'}
            height={'100%'}
            volume={0.2}
            controls
            loop
          />
        </div>
      </Waypoint>
    );

  if (isPostPage)
    return (
      <div className={styles.wrapper}>
        <div className={styles.blurBackground} style={{ backgroundImage: `url(${imageSrc?.resolutions[0]?.url})` }}></div>
        <img
          className={styles.previewPage}
          src={imageSrc.variants.gif ? imageSrc.variants.gif.source.url : imageSrc?.source.url}
          alt='Post preview'
        />
      </div>
    );

  if (preview)
    return (
      <img
        className={styles.preview}
        src={imageSrc?.resolutions[1]?.url || imageSrc?.resolutions[0]?.url}
        alt='Post preview'
      />
    );

  return <div></div>;
};
