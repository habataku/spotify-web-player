import { useParams } from 'react-router';
import Topnav from '../component/topnav/topnav';
import TitleS from '../component/text/title-s';
import TextBoldL from '../component/text/text-bold-l';
import TextBoldM from '../component/text/text-bold-m';
import TextRegularM from '../component/text/text-regular-m';
import PlayButton from '../component/buttons/play-button';
import IconButton from '../component/buttons/icon-button';
import * as Icons from '../component/icons';
import { PLAYLIST } from "../data/index";

import styles from './playlist.module.css';

function PlaylistPage({ isPlaying, setIsPlaying, setTrackData }) {
	const { path } = useParams();

	function changeBg(color){
		document.documentElement.style.setProperty('--hover-home-bg', color);
	}

	return (
		<div className={styles.PlaylistPage}>
			<div className={styles.gradientBg}></div>
            <div className={styles.gradientBgSoft}></div>
			<div className={styles.Bg}></div>

			<Topnav />

			{PLAYLIST.map((item) => {
                if(item.link == path){
                    return (
                        <div key={item.title} onLoad={changeBg(item.playlistBg)}>

                            <div className={styles.playlistDetails}>
								<div className={styles.imgBox}>
									<img src={item.imgUrl} />
								</div>
								<div className={styles.textBox}>
									{isPlaying}
									<TitleS>{item.type}</TitleS>
									<h1>{item.title}</h1>
									<div className={styles.Artist}>
										<figure>
											<img src={item.imgUrl} />
										</figure>
										<TextBoldM>{item.artist}</TextBoldM>
									</div>
								</div>
							</div>

							<div className={styles.PlaylistIcons}>
								<PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
								<IconButton icon={<Icons.Like />} activeicon={<Icons.LikeActive />}/>
								<Icons.More className={styles.moreIcon}/>
							</div>

							<div className={styles.PlaylistSongs}>
								{item.playlistData.map((song) => {
									return (
										<button 
											key={song.index} 
											onClick={() => {
												setTrackData({
													trackKey: [PLAYLIST.indexOf(item), item.playlistData.indexOf(song)],
													track: song.link,
													trackName: song.songName,
													trackImg: song.songimg,
													trackArtist: song.songArtist,
												})
											}} 
											className={styles.SongBtn}
											style={
												item.type === "albüm" 
													? {gridTemplateColumns: '16px 1fr 38px'} 
													: {}
											}
										>
											<PlayButton 
												isPlaying={isPlaying} 
												setIsPlaying={setIsPlaying}
											/>
											<p className={styles.SongIndex}>{song.index}</p>
												{item.type === "albüm"
													? ''
													: <img src={song.songimg} />
												}
											<span>
												<TextBoldL>{song.songName}</TextBoldL>
												<TextRegularM>{song.songArtist}</TextRegularM>
											</span>
											<p>{song.trackTime}</p>
										</button>
									);
								})}
							</div>
                        </div>
                    );
                }
			})}
		</div>
	);
}

export default PlaylistPage;
