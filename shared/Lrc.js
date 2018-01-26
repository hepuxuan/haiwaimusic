// credit goes to https://github.com/justan/lrc/blob/master/lrc.js
/* eslint-disable */
Date.now = Date.now || (new Date()).getTime;
const timeExp = /\[(\d{2,})\:(\d{2})(?:\.(\d{2,3}))?\]/g;
const tagsRegMap = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by',
};

function trim(lrc) {
  return lrc.replace(/(^\s*|\s*$)/m, '');
}

function isLrc(lrc) {
  return timeExp.test(lrc);
}

export default class Lrc {
  constructor(originalLrc, handler = () => {}) {
    const lrc = trim(originalLrc);
    this.lrc = lrc;// lrc 歌词
    this.handler = handler;
    this.tags = {};// ID tags. 标题, 歌手, 专辑
    this.lines = [];// 详细的歌词信息
    this.txts = [];
    this.isLrc = isLrc(lrc);

    this.curLine = 0;//
    this.state = 0;// 0: stop, 1: playing

    let res;
    let line;
    let time;
    const lines = lrc.split(/\n/);
    let _last;

    for (const tag in tagsRegMap) {
      res = lrc.match(new RegExp(`\\[${tagsRegMap[tag]}:([^\\]]*)\\]`, 'i'));
      this.tags[tag] = res && res[1] || '';
    }

    timeExp.lastIndex = 0;
    for (let i = 0, l = lines.length; i < l; i++) {
      while (time = timeExp.exec(lines[i])) {
        _last = timeExp.lastIndex;
        line = trim(lines[i].replace(timeExp, ''));
        timeExp.lastIndex = _last;
        this.lines.push({
          time: time[1] * 60 * 1000 + time[2] * 1000 + (time[3] || 0) * 10,
          originLineNum: i,
          txt: line,
        });
        this.txts.push(line);
      }
    }

    this.lines.sort((a, b) => a.time - b.time);
  }

  focusLine(i) {
    if (this.lines[i]) {
      this.handler(this.lines[i].txt, {
        originLineNum: this.lines[i].originLineNum,
        lineNum: i,
      });
    }
  }

  findCurLine(time) {
    for (var i = 0, l = this.lines.length; i < l; i++) {
      if (time <= this.lines[i].time) {
        break;
      }
    }
    return i;
  }

  play(time = 0, skipLast) {
    this._startStamp = Date.now() - time;// 相对开始时间戳
    this.state = 1;

    if (this.isLrc) {
      this.curLine = this.findCurLine(time);

      if (!skipLast) {
        this.curLine && this.focusLine(this.curLine - 1);
      }

      if (this.curLine < this.lines.length) {
        clearTimeout(this._timer);
        const loopy = () => {
          this.focusLine(this.curLine++);

          if (this.lines[this.curLine]) {
            this._timer = setTimeout(() => {
              loopy();
            }, this.lines[this.curLine].time - (Date.now() - this._startStamp));
            // }, this.lines[this.curLine].time - this.lines[this.curLine--].time);//一些情况可能用得上
          } else {
            // end
          }
        };
        this._timer = setTimeout(loopy, this.lines[this.curLine].time - time);
      }
    }
  }

  pauseToggle() {
    const now = Date.now();
    if (this.state) {
      this.stop();
      this._pauseStamp = now;
    } else {
      this.play((this._pauseStamp || now) - (this._startStamp || now), true);
      delete this._pauseStamp;
    }
  }

  seek(offset) {
    this._startStamp -= offset;
    this.state && this.play(Date.now() - this._startStamp);// 播放时让修改立即生效
  }
  stop() {
    this.state = 0;
    clearTimeout(this._timer);
  }
}
/* eslint-enable */
