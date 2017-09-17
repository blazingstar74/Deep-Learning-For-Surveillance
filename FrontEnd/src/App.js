import React, { Component } from 'react';
import './App.css';
import TagsBar from './components/tagsBar';
import MotionBar from './components/motionBar';
import ReactPlayer from 'react-player'
import VideoList from './components/videoList';
import NavBar from './components/navbar';
import VidLegend from './components/vidLegend';
import {fetchJson} from './dataAction';

const mock_data = [
  {
    tStart: 35,
    tEnd: 40,
    tag: 'person',
  },
  {
    tStart: 21,
    tEnd: 31,
    tag: 'dog',
  },
  {
    tStart: 3,
    tEnd: 10,
    tag: 'iAmSleepy',
  }
];

const mockMotionData = [0, 22, 23, 25, 26, 24, 27, 24, 26, 22, 25, 23, 25, 21, 23, 19, 19, 15, 18, 16, 18, 18, 20, 18, 18, 18, 19, 17, 19, 21, 20, 18, 21, 19, 22, 19, 21, 18, 21, 19, 20, 20, 20, 18, 21, 17, 19, 16, 19, 18, 18, 16, 17, 17, 17, 14, 15, 15, 15, 13, 14, 14, 15, 15, 16, 15, 16, 15, 16, 16, 16, 15, 17, 15, 16, 15, 15, 18, 17, 15, 16, 16, 17, 15, 16, 15, 16, 15, 15, 15, 17, 14, 16, 16, 16, 15, 17, 14, 17, 14, 16, 15, 17, 15, 16, 14, 17, 14, 16, 15, 16, 15, 16, 14, 17, 15, 16, 15, 15, 15, 17, 14, 15, 14, 15, 15, 16, 15, 16, 15, 17, 14, 15, 15, 15, 14, 16, 14, 16, 13, 15, 16, 15, 14, 16, 15, 17, 15, 16, 17, 15, 14, 14, 16, 15, 13, 14, 14, 16, 14, 14, 14, 15, 14, 16, 13, 15, 13, 16, 14, 16, 13, 14, 15, 17, 14, 14, 14, 15, 13, 15, 13, 15, 15, 15, 13, 15, 12, 14, 13, 15, 13, 16, 13, 14, 10, 13, 15, 13, 13, 13, 13, 14, 12, 13, 12, 12, 12, 13, 11, 13, 11, 13, 10, 13, 12, 16, 10, 12, 8, 9, 12, 11, 9, 9, 10, 11, 8, 10, 9, 10, 8, 10, 10, 9, 8, 9, 8, 9, 8, 12, 8, 10, 7, 8, 8, 8, 7, 9, 6, 10, 5, 7, 8, 8, 6, 7, 7, 7, 5, 8, 4, 5, 4, 6, 4, 7, 3, 5, 7, 7, 4, 5, 4, 7, 5, 7, 12, 12, 11, 12, 9, 12, 8, 10, 8, 11, 9, 12, 11, 10, 8, 8, 12, 10, 9, 11, 9, 13, 9, 11, 13, 13, 8, 8, 9, 10, 10, 15, 11, 16, 14, 16, 12, 13, 10, 13, 14, 16, 17, 12, 17, 16, 14, 17, 17, 14, 13, 14, 15, 12, 9, 17, 16, 12, 8, 11, 16, 16, 8, 9, 9, 12, 10, 11, 8, 11, 7, 10, 8, 10, 6, 10, 7, 10, 7, 10, 7, 9, 7, 14, 8, 9, 11, 11, 15, 8, 6, 7, 8, 12, 9, 11, 9, 12, 10, 15, 12, 12, 9, 11, 13, 6, 4, 8, 5, 5, 4, 4, 6, 6, 3, 6, 7, 7, 7, 8, 6, 7, 6, 8, 5, 7, 6, 7, 5, 6, 5, 6, 4, 5, 3, 5, 5, 7, 3, 5, 6, 7, 4, 5, 7, 5, 5, 6, 7, 5, 3, 6, 4, 6, 4, 6, 5, 6, 2, 5, 4, 7, 4, 5, 6, 7, 3, 6, 4, 5, 4, 4, 5, 5, 4, 6, 4, 4, 3, 6, 7, 4, 4, 5, 5, 6, 4, 4, 5, 4, 3, 4, 4, 5, 5, 6, 4, 5, 4, 5, 6, 4, 4, 10, 4, 6, 3, 5, 5, 4, 4, 5, 3, 4, 4, 5, 4, 4, 5, 5, 3, 6, 3, 5, 5, 4, 3, 7, 5, 6, 3, 4, 6, 4, 3, 3, 2, 7, 3, 5, 12, 12, 6, 6, 12, 8, 7, 11, 11, 10, 9, 5, 6, 12, 7, 10, 11, 9, 8, 12, 10, 12, 11, 11, 9, 11, 9, 10, 9, 11, 9, 12, 12, 15, 11, 14, 9, 12, 9, 14, 15, 20, 16, 19, 17, 19, 17, 21, 21, 23, 20, 21, 21, 22, 22, 23, 22, 25, 22, 27, 24, 24, 21, 23, 25, 25, 22, 23, 22, 26, 21, 23, 20, 23, 20, 23, 19, 24, 19, 21, 18, 22, 17, 25, 18, 22, 17, 18, 20, 19, 16, 19, 21, 21, 16, 21, 19, 18, 12, 15, 11, 14, 13, 17, 19, 18, 19, 17, 14, 23, 15, 18, 19, 19, 16, 19, 16, 21, 16, 18, 16, 16, 15, 14, 14, 17, 14, 17, 10, 17, 15, 19, 13, 17, 13, 15, 15, 16, 13, 14, 13, 15, 12, 14, 13, 17, 15, 16, 13, 16, 14, 17, 14, 16, 14, 16, 13, 13, 13, 15, 16, 17, 14, 16, 14, 18, 17, 17, 16, 18, 16, 17, 16, 18, 17, 18, 15, 18, 15, 17, 15, 15, 14, 14, 12, 11, 8, 9, 9, 11, 10, 10, 11, 9, 8, 7, 6, 7, 6, 7, 7, 8, 6, 13, 8, 7, 6, 7, 7, 8, 7, 8, 6, 7, 4, 5, 5, 5, 5, 6, 5, 6, 5, 6, 4, 7, 5, 6, 6, 6, 5, 5, 6, 7, 4, 5, 5, 6, 5, 6, 4, 6, 5, 5, 4, 5, 5, 5, 4, 6, 4, 6, 5, 6, 5, 6, 7, 7, 6, 7, 6, 8, 5, 8, 8, 10, 9, 15, 13, 10, 9, 12, 9, 11, 8, 16, 12, 16, 10, 11, 11, 12, 10, 12, 12, 13, 11, 17, 14, 15, 14, 15, 14, 17, 14, 18, 16, 15, 12, 17, 16, 16, 15, 17, 17, 19, 16, 18, 17, 21, 17, 20, 17, 20, 19, 21, 19, 20, 18, 21, 19, 19, 18, 26, 20, 22, 20, 21, 21, 22, 20, 21, 18, 21, 18, 19, 17, 21, 17, 17, 15, 16, 12, 14, 11, 14, 8, 8, 7, 7, 5, 8, 8, 9, 7, 8, 7, 9, 6, 8, 7, 9, 7, 8, 7, 8, 7, 8, 6, 7, 5, 8, 5, 7, 5, 6, 6, 6, 6, 6, 5, 7, 6, 7, 4, 6, 5, 6, 5, 6, 5, 6, 5, 7, 6, 8, 7, 7, 7, 7, 6, 9, 6, 7, 5, 7, 7, 7, 6, 8, 7, 6, 6, 8, 5, 7, 6, 8, 6, 7, 7, 6, 4, 6, 6, 9, 6, 6, 5, 7, 6, 7, 5, 7, 7, 6, 5, 8, 6, 7, 5, 7, 6, 13, 9, 7, 6, 5, 7, 7, 6, 7, 14, 15, 8, 10, 7, 8, 9, 10, 7, 9, 8, 10, 9, 9, 8, 9, 7, 9, 8, 9, 8, 9, 8, 9, 7, 9, 7, 7, 6, 8, 6, 8, 7, 8, 7, 9, 7, 9, 7, 10, 7, 10, 7, 8, 9, 9, 7, 8, 7, 8, 7, 7, 7, 6, 7, 8, 8, 7, 6, 7, 7, 8, 7, 9, 7, 8, 6, 8, 9, 10, 13, 10, 10, 13, 10, 11, 9, 11, 12, 13, 9, 11, 13, 14, 13, 12, 12, 13, 12, 14, 12, 14, 16, 17, 15, 16, 17, 18, 16, 18, 17, 16, 14, 17, 15, 18, 15, 19, 18, 20, 19, 24, 19, 22, 19, 21, 18, 21, 19, 22, 19, 23, 20, 23, 20, 20, 17, 16, 15, 13, 11, 14, 8, 15, 10, 11, 10, 12, 11, 12, 13, 14, 12, 14, 14, 15, 14, 13, 12, 15, 14, 15, 13, 14, 14, 16, 11, 15, 13, 17, 12, 14, 14, 14, 16, 17, 14, 15, 14, 17, 16, 16, 15, 17, 16, 17, 15, 17, 15, 18, 15, 16, 15, 16, 15, 15, 15, 14, 15, 15, 13, 14, 14, 16, 14, 14, 13, 15, 15, 15, 14, 16, 14, 17, 14, 15, 14, 16, 14, 16, 14, 15, 15, 16, 15, 16, 14, 19, 15, 16, 14, 17, 15, 17, 15, 16, 16, 18, 17, 17, 16, 22, 18, 19, 17, 19, 18, 20, 17, 18, 17, 19, 17, 18, 18, 18, 18, 18, 18, 18, 17, 19, 17, 18, 16, 19, 16, 18, 16, 17, 16, 17, 15, 16, 16, 18, 15, 17, 15, 19, 18, 17, 16, 18, 16, 18, 16, 18, 17, 18, 16, 17, 15, 16, 16, 17, 15, 16, 14, 18, 15, 15, 15, 16, 16, 16, 15, 16, 16, 17, 15, 16, 15, 18, 16, 15, 14, 15, 15, 16, 15, 15, 13, 16, 14, 15, 15, 17, 16, 16, 14, 16, 15, 17, 14, 16, 15, 18, 15, 17, 15, 16, 17, 18, 17, 18, 14, 18, 16, 17, 15, 16, 16, 16, 15, 17, 16, 18, 14, 16, 16, 20, 15, 16, 15, 15, 16, 15, 14, 15, 14, 16, 16, 17, 14, 16, 16, 16, 14, 16, 15, 17, 15, 16, 15, 17, 15, 16, 14, 16, 17, 16, 14, 15, 15, 17, 15, 15, 14, 16, 16, 16, 17, 17, 15, 19, 12, 14, 11, 13, 12, 13, 12, 13, 12, 13, 10, 13, 8, 12, 11, 12, 8, 11, 10, 10, 7, 10, 10, 10, 8, 11, 10, 12, 10, 11, 9, 11, 11, 11, 10, 11, 9, 11, 9, 10, 11, 17, 14, 16, 9, 17, 16, 16, 12, 15, 9, 11, 10, 10, 6, 8, 8, 9, 7, 7, 7, 9, 7, 9, 6, 8, 7, 7, 6, 8, 7, 9, 7, 8, 7, 13, 7, 9, 7, 8, 8, 10, 7, 7, 7, 9, 7, 9, 7, 11, 8, 9, 10, 7, 7, 7, 7, 7, 7, 10, 8, 7, 6, 8, 17, 12, 12, 14, 12, 16, 15, 18, 15, 20, 19, 20, 20, 20, 18, 21, 17, 19, 16, 21, 18, 19, 19, 20, 18, 20, 16, 22, 21, 21, 18, 18, 17, 20, 18, 21, 12, 15, 12, 20, 18, 14, 11, 15, 15, 12, 11, 15, 13, 15, 12, 13, 13, 17, 12, 14, 12, 14, 13, 20, 18, 15, 13, 14, 11, 13, 11, 14, 11, 12, 10, 14, 18, 18, 10, 14, 11, 14, 10, 11, 9, 11, 10, 9, 8, 9, 10, 11, 10, 11, 10, 15, 10, 11, 9, 10, 11, 10, 9, 11, 9, 11, 9, 11, 10, 12, 10, 11, 10, 12, 11, 14, 10, 13, 11, 13, 11, 13, 11, 17, 17, 17, 17, 18, 16, 19, 18, 19, 17, 19, 18, 21, 18, 26, 22, 24, 21, 24, 22, 26, 23, 25, 24, 27, 26, 28, 24, 27, 24, 28, 26, 27, 26, 29, 29, 30, 28, 30, 29, 31, 28, 30, 29, 32, 29, 31, 28, 30, 27, 28, 24, 25, 23, 24, 21, 22, 18, 19, 18, 16, 14, 14, 12, 13, 12, 7, 6, 9, 7, 7, 6, 7, 7, 8, 7, 8, 6, 8, 7, 8, 5, 8, 7, 8, 6, 7, 6, 9, 7, 8, 6, 12, 8, 7, 6, 7, 9, 8, 7, 7, 7, 8, 7, 8, 7, 8, 8, 7, 6, 8, 8, 9, 7, 8, 8, 10, 8, 9, 7, 8, 10, 12, 15, 16, 8, 10, 8, 10, 7, 9, 15, 14, 12, 15, 13, 16, 13, 16, 15, 17, 15, 16, 16, 18, 17, 17, 14, 15, 15, 18, 18, 20, 20, 25, 24, 25, 23, 26, 25, 28, 24, 27, 26, 29, 27, 29, 25, 26, 25, 26, 22, 24, 20, 22, 18, 23, 15, 21, 18, 17, 12, 14, 19, 18, 14, 20, 18, 16, 14, 16, 14, 17, 19, 22, 22, 26, 23, 26, 22, 23, 21, 24, 21, 23, 22, 25, 24, 25, 20, 22, 19, 24, 18, 20, 17, 20, 18, 21, 18, 19, 17, 19, 17, 19, 17, 20, 19, 18, 16, 18, 16, 18, 15, 18, 15, 18, 16, 21, 15, 15, 18, 20, 18, 20, 14, 22, 17, 18, 15, 18, 18, 19, 16, 17, 16, 17, 15, 16, 14, 17, 16, 17, 16, 19, 18, 20, 20, 22, 19, 22, 20, 22, 20, 25, 22, 23, 19, 22, 20, 23, 19, 25, 19, 25, 19, 21, 18, 19, 18, 19, 17, 18, 15, 18, 14, 17, 15, 17, 16, 17, 15, 16, 15, 18, 15, 18, 16, 17, 18, 19, 16, 16, 16, 18, 17, 19, 16, 22, 16, 17, 16, 16, 16, 20, 14, 17, 15, 17, 14, 15, 13, 17, 11, 12, 9, 9, 12, 7, 6, 5, 4, 5, 4, 5, 5, 6, 6, 5, 5, 6, 6, 7, 5, 6, 4, 8, 7, 5, 5, 6, 8, 7, 5, 6, 6, 8, 6, 5, 4, 6, 6, 4, 4, 4, 4, 6, 12, 13, 12, 12, 10, 11, 9, 10, 11, 12, 10, 10, 10, 11, 12, 8, 12, 12, 6, 7, 6, 15, 8, 11, 8, 10, 8, 12, 9, 11, 10, 16, 10, 9, 9, 10, 10, 12, 9, 10, 10, 11, 11, 12, 11, 11, 15, 14, 11, 14, 11, 17, 10, 11, 10, 16, 16, 13, 11, 17, 12, 14, 13, 13, 12, 18, 12, 12, 9, 12, 12, 18, 13, 15, 14, 20, 14, 17, 15, 17, 17, 18, 16, 17, 16, 20, 17, 19, 15, 18, 16, 17, 15, 17, 18, 18, 16, 19, 14, 20, 11, 17, 10, 16, 13, 18, 15, 12, 16, 17, 14, 19, 13, 18, 14, 16, 14, 18, 17, 16, 12, 15, 15, 18, 16].map(instance => instance * 2);


class App extends Component {

  constructor(){
    super();
    this.state = {
      data: mock_data,
      vidLen: 291,
      played: 0,
      url: null
    };
    this.handleClickSecond = this.handleClickSecond.bind(this);
    this.handleSelectVideo = this.handleSelectVideo.bind(this);
    this.handleValueChanged = this.handleValueChanged.bind(this);
    this.handleUpdateTime = this.handleUpdateTime.bind(this);
  }

  handleClickSecond(sec) {
    this.refs.player.seekTo(sec);
  };

  handleValueChanged(e){
    this.setState({played: e.playedSeconds})
  }

  handleSelectVideo(video){
    this.setState({ url: video.videoUrl });
    // TODO add here endpoint
    // const videoData = fetchJson()
    // TODO add setState to move blob to state and then load from state

  }

  handleUpdateTime(){

    if(this.refs.player.getDuration() && this.state.vidLen !== this.refs.player.getDuration()){
      this.setState({ vidLen: this.refs.player.getDuration()});
    }

  }

  componentDidUpdate(){
    //console.log('duration',this.refs.player.getDuration());
  }

  render() {
    return (
      <div>
      <NavBar />
      <div className="myContainer">
      <div className="section">

        <div className="row">
          <div className="col xl9 l9 m9 s12">


            {
              this.state.url ?

                <div>
                <h4>Name</h4>
                <div className="row">

                  <ReactPlayer
                    playing
                    url={this.state.url}
                    ref="player"
                    width="inherit"
                    onProgress={this.handleValueChanged}
                    className="responsive-video myVideo"
                    onReady={this.handleUpdateTime}
                  />

                  <TagsBar played={this.state.played} data={this.state.data} vidLen={this.state.vidLen} onClickSecond={this.handleClickSecond}/>
                  <MotionBar data={mockMotionData} vidLen={this.state.vidLen} onClickSecond={this.handleClickSecond}/>

                  </div>
                </div>
                :
                <h4>Please select a video</h4>
            }
            <VidLegend />
          </div>


          <div className="col xl3 l3 m3 s12 vidContent">

          <h4 className="vidHeading">Videos</h4>
          <div className="vidList">
          <VideoList selectVid={this.handleSelectVideo} onClick={this.handleSelectVideo} selectedVideoUrl={this.state.url}/>
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
