import React, { useState, useEffect } from 'react';
import '../styles/player.css';
import Hls from 'hls.js';
import { FaFilm, FaPlay } from 'react-icons/fa';

export default function Player() {
    const [videos] = useState([
        'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
        'https://test-streams.mux.dev/pts_shift/master.m3u8'
    ]);

    const [currentVideo, setCurrentVideo] = useState(videos[0]);
    const [levels, setLevels] = useState();
    const [info, setInfo] = useState();

    useEffect(() => {
        playVideo();
    }, [currentVideo]);

    const playVideo = () => {
        if (Hls.isSupported()) {
            var video = document.getElementById('video');
            var hls = new Hls();
            hls.loadSource(currentVideo);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setCurrentLevel(hls, 0);
                setLevels(hls.levels.map((level, idx) => {
                    return (
                        <button key={idx} onClick={() => setCurrentLevel(hls, idx)}>{ level.bitrate }</button>
                    );
                }));
                video.play();
            });
        }
    }

    const setCurrentLevel = (hls, level) => {
        hls.currentLevel = level;
        setInfo({
            url: hls.levels[level].url[0],
            width: hls.levels[level].width,
            height: hls.levels[level].height,
            bitrate: hls.levels[level].bitrate,
            videoCodec: hls.levels[level].videoCodec,
            audioCodec: hls.levels[level].audioCodec,
        });
    }

    const returnInfo = () => {
        let infoJSX = [];
        for (var key in info) {
            infoJSX.push(
                <p key={key}><strong>{key}</strong>: {info[key]} </p>
            );
        }
        return infoJSX;
    }

    const setVideoFromInput = () => {
        if (document.getElementById("url-input").value)
            setCurrentVideo(document.getElementById("url-input").value);
    }

    return (
        <main>
            <div className="player-container">
                <div className="width-limiter">
                    <section className="url-input">
                        <input id="url-input" type="text" placeholder="Enter link to a .m3u8 playlist" />
                        <button onClick={setVideoFromInput}><FaPlay size={20} onClick={setVideoFromInput} /></button>
                    </section>
                    <section className="example-videos">
                        <h1>Example videos</h1>
                        <div className="row">
                            { videos.map((video, idx) => {
                                return (
                                    <button key={idx} onClick={() => setCurrentVideo(videos[idx])}>
                                        <FaFilm className="film-logo" color="white"/>Video {idx+1}
                                    </button>
                                )
                            })}
                        </div>
                    </section>
                    <section className="video">   
                        <video id="video" style={{width: '80%', height: 'auto', background: "#000"}} autoPlay={true} controls />
                    </section>
                </div>
            </div>
            <div className="width-limiter">
                <div className="info-container">
                    <section className="levels">
                        <h1>Change bitrate</h1>
                        <div className="row">
                            { levels }
                        </div>
                    </section>
                    <section className="info">
                        <h1>Video basic information</h1>
                        <div>
                            { returnInfo() }
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}
