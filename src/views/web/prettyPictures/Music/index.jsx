import React, { useEffect, useRef, useState } from 'react'
import { Image, Slider } from 'antd'
import {
  CustomerServiceOutlined,
  AudioOutlined,
  DoubleLeftOutlined,
  BackwardOutlined,
  PlayCircleFilled,
  PauseCircleFilled,
  ForwardOutlined,
  FunnelPlotFilled,
} from '@ant-design/icons'
import './index.less'
import musicUrl1 from '@/assets/images/avatar.jpeg'

export default function MusicBox({ musicInfoList }) {
  //  音乐播放器对象
  const musicRef = useRef()
  //   音乐信息
  const [musicInfo, setMusicInfo] = useState([])
  //   音乐信息索引
  const [musicIndex, setMusicIndex] = useState(0)
  //   音乐地址
  const [musicSrc, setMusicSrc] = useState('')
  //   音乐名称
  const [musicName, setMusicName] = useState('')
  //   音乐创作者
  const [musicArt, setMusicArt] = useState('')
  //   音乐当前时间
  const [currentTime, setCurrentTime] = useState(0)
  //   音乐时长
  const [maxTime, setMaxTime] = useState('')
  //   播放器音量
  const [musicVolume, setMusicVolume] = useState('')
  //   音乐定时器
  const [musicTimer, setMusicTimer] = useState('')
  //   音乐是否在播放
  const [musicPlay, setMusicPlay] = useState(false)
  //   音乐封面
  const [musicUrl, setmusicUrl] = useState('')

  // 监听音乐列表是否加载完毕
  useEffect(() => {
    if (musicInfo.length === 0) return setMusicInfo([...musicInfoList])

    setMusicName(musicInfo[musicIndex].musicName)
    setMusicArt(musicInfo[musicIndex].musicArt)
    setMusicSrc(musicInfo[musicIndex].musicSrc)
    setmusicUrl(musicInfo[musicIndex].musicLyricsSrc)
  }, [musicInfo])

  // 监听播放的音乐索引
  useEffect(() => {
    if (musicInfo.length == 0) return

    const { musicName, musicArt, musicSrc } = musicInfo[musicIndex]
    setMusicName(musicName)
    setMusicArt(musicArt)
    setMusicSrc(musicSrc)
    setTimeout(playMusic, 500)
  }, [musicIndex])

  // 歌曲时间格式化
  const songTimeFilter = (val) => {
    const dt = new Date(val * 1000)
    // 分秒
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${mm}:${ss}`
  }

  // 控制音乐播放
  const playMusic = () => {
    if (musicRef.current.paused) {
      if (!musicVolume) {
        musicRef.current.volume = 0.1
        setMusicVolume(0.1)
      }
      console.log(`musicRef`, musicRef);
      musicRef.current.src = musicSrc
      musicRef.current.play()
      watchMusicInfo()
      setMusicPlay(true)
    } else {
      musicRef.current.pause()
      setMusicPlay(false)
      clearInterval(musicTimer)
    }
  }

  // 监听音乐播放信息
  const watchMusicInfo = () => {
    clearInterval(musicTimer)
    setMaxTime(musicRef.current.duration)
    // 设置定时器，每 0.5s 更新一下歌曲进度
    const theTimer = setInterval(() => {
      setMusicTimer(theTimer)
      //   如果音乐暂停了，结束定时器
      if (musicRef.current.paused) {
        clearInterval(musicTimer)
        setMusicPlay(false)
      }
      //   如果音乐播放结束了，结束定时器
      if (musicRef.current.ended) {
        clearInterval(musicTimer)
        setMusicPlay(false)
        changePlayMusic(1)
      }

      setCurrentTime(musicRef.current.currentTime)
    }, 500)
  }

  // 通过进度条更改歌曲播放进度
  const changeMusicTime = (value) => {
    clearInterval(musicTimer)
    musicRef.current.currentTime = value
    if (musicRef.current.paused) musicRef.current.play()
    setMusicPlay(true)
    watchMusicInfo()
  }

  // 设置音乐播放器音量
  const setVolume = (val) => {
    if (!musicVolume) {
      musicRef.current.volume = 0.1
      setMusicVolume(0.1)
      return
    }
    if (!val) return
    musicRef.current.volume = val
  }
  // 调整音量
  const changePlayerVolume = (value) => {
    if (value == 0) return (musicRef.current.volume = 0)
    setMusicVolume(value / 10)
    setVolume(value / 10)
  }

  // 格式化 Tooltip 的内容
  const formatter = (value) => songTimeFilter(value)

  // 切换歌曲的播放
  const changePlayMusic = (num) => {
    const index = musicIndex + num
    if (index < 0) return setMusicIndex(musicInfo.length - 1)
    if (index >= musicInfo.length) return setMusicIndex(0)

    setMusicIndex(index)
  }

  return (
    <div className="musicBox">
      {/* 音乐播放器   */}
      <audio ref={musicRef} src={musicSrc}></audio>

      {/* 左侧歌曲图片 */}
      <div className="musicImage">
        <Image width={120} src={musicUrl || musicUrl1} />
      </div>

      {/* 中部歌曲信息 */}
      <div className="musicInfo">
        <div className="musicDesc">
          <CustomerServiceOutlined
            style={{ color: '#ac8edc', paddingRight: '10px' }}
          />
          {musicName}
        </div>
        <div className="musicDesc">
          <AudioOutlined style={{ color: '#ac8edc', paddingRight: '10px' }} />
          {musicArt}
        </div>

        {/* 歌曲进度条 */}
        <div className="progressBar">
          <Slider
            tooltip={{ formatter }}
            value={currentTime}
            max={maxTime}
            onChange={(value) => setCurrentTime(value)}
            onAfterChange={changeMusicTime}
          />
          <div className="musicTime">
            {songTimeFilter(currentTime)} / {songTimeFilter(maxTime)}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="operationBar">
          <BackwardOutlined
            style={{ fontSize: '28px' }}
            onClick={() => changePlayMusic(-1)}
          />
          {musicPlay ? (
            <PauseCircleFilled
              style={{ fontSize: '22px' }}
              onClick={playMusic}
            />
          ) : (
            <PlayCircleFilled
              style={{ fontSize: '22px' }}
              onClick={playMusic}
            />
          )}
          <ForwardOutlined
            style={{ fontSize: '28px' }}
            onClick={() => changePlayMusic(1)}
          />
          <FunnelPlotFilled style={{ fontSize: '22px' }} rotate={90} />
          <div className="volume">
            <Slider defaultValue={1} max={10} onChange={changePlayerVolume} />
          </div>
        </div>
      </div>

      {/* 右侧箭头按钮 */}
      <div>
        <DoubleLeftOutlined />
      </div>
    </div>
  )
}
