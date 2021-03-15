import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextBoldL from '../text/text-bold-l';
import PlayButton from '../buttons/play-button';

import styles from "./playlist-card-s.module.css";

function PlaylistCardS({ data, trackData, isPlaying, setIsPlaying }){
    const[isthisplay, setIsthisPlay] = useState(false)

    function changeTheme(){
        document.documentElement.style.setProperty('--hover-home-bg', data.hoverColor);
    }

    useEffect(() => {
		setIsthisPlay(parseInt(data.index) === trackData.trackKey[0])
	})

    return (
        <Link to={`/playlist/${data.link}`} onMouseOver={changeTheme}>
            <div className={styles.PlaylistCardS}>
                <div className={styles.ImgBox}>
                    <img src={data.imgUrl} alt={`${data.title}`} />
                </div>
                <div className={styles.Title}>
                    <TextBoldL>{data.title}</TextBoldL>
                    <div className={styles.IconBox}>
                        <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} isthisplay={isthisplay}/>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PlaylistCardS;