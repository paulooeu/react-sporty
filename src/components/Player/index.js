/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable linebreak-style */
import React from 'react';
import Slider from 'rc-slider';
import {
  Container, Current, Volume, Progress, Controls, ProgressSlider, Time,
} from './styles';
import VolumeIcon from '../../assets/images/volume.svg';
import ShuffleIcon from '../../assets/images/shuffle.svg';
import BackwardIcon from '../../assets/images/backward.svg';
import PlayIcon from '../../assets/images/play.svg';
import PauseIcon from '../../assets/images/pause.svg';
import ForwardIcon from '../../assets/images/forward.svg';
import RepeatIcon from '../../assets/images/repeat.svg';

const Player = () => (
  <Container>
    <Current>
      <img
        src="https://static1.purebreak.com.br/articles/9/84/40/9/@/314437-djonga-lanca-ladrao-terceiro-album-da-diapo-2.jpg"
        alt="Sou Ladrão"
      />
      <div>
        <span>Ladrão</span>
        <small>Djonga</small>
      </div>
    </Current>
    <Progress>
      <Controls>
        <button>
          <img src={ShuffleIcon} alt="ShuffleIcon" />
        </button>
        <button>
          <img src={BackwardIcon} alt="BackwardIcon" />
        </button>
        <button>
          <img src={PlayIcon} alt="PlayIcon" />
        </button>
        <button>
          <img src={PauseIcon} alt="PauseIcon" />
        </button>
        <button>
          <img src={ForwardIcon} alt="ForwardIcon" />
        </button>
        <button>
          <img src={RepeatIcon} alt="RepeatIcon" />
        </button>
      </Controls>
      <Time>
        <span>1:39</span>
        <ProgressSlider>
          <Slider
            railStyle={{ background: '#404040', borderRadius: 10 }}
            trackStyle={{ background: '#1Ed760' }}
            handleStyle={{ border: 0 }}
          />
        </ProgressSlider>
        <span>4:21</span>
      </Time>
    </Progress>
    <Volume>
      <img src={VolumeIcon} alt="Volume" />
      <Slider
        railStyle={{ background: '#404040', borderRadius: 10 }}
        trackStyle={{ background: '#fff' }}
        handleStyle={{ display: 'none' }}
        // value={100}
      />
    </Volume>
  </Container>
);

export default Player;
