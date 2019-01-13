// const MapClass = class {
//     layout1 = [{'x': 0, 'y': 0, 'w': 1, 'h': 3, 'i': '0', 'flag': false}]
//     historyLayout1 = [{'x': 0, 'y': 0, 'w': 1, 'h': 3, 'i': '0', 'flag': false}]
//     cardHight = 3
//     cardWight = 1
//     curBox = ''
//     deleteItem = function (index) {
//       console.log(index)
//       this.layout1.splice(index, 1)
//       this.historyLayout1.splice(index, 1)
//     }
//     judgeItemPosition = function (newX, newY) {
//       // eslint-disable-next-line camelcase
//       var temp_layout = this.layout1
//       for (var i = 0; i < temp_layout.length; i++) {
//         if (newX === temp_layout[i].x && newY === temp_layout[i].y) {
//           return false
//         }
//       }
//       if ((newY % this.cardHight) === 0) {
//         return false
//       }
//       return true
//     }
//     watchitem = function (item) {
//       let historyLayout1 = this.historyLayout1
//       console.log(historyLayout1)
//       console.log('this.curbox:' + this.curBox)
//       // console.log("this.i:"+ item.i)
//       if (this.curBox !== item.i) {
//         // console.log("赋值:"+ item.i)
//         for (let j = 0; historyLayout1[j] !== undefined; j++) {
//           if (historyLayout1[j].i === item.i) {
//             item.x = historyLayout1[j].x
//             item.y = historyLayout1[j].y
//             console.log('X:' + item.x + 'Y:' + item.y)
//           }
//         }
//       }
//       return item
//     }
//     toChangePosition = function (i) {
//       let layout = this.layout1
//       let hisLayout = this.historyLayout1
//       for (let j = 0; j < layout.length; j++) {
//         if (layout[j].i === i) {
//           let item = layout[j]
//           for (let k = 0; k < hisLayout.length; k++) {
//             if (hisLayout[k].i === i) {
//               let hisItem = hisLayout[k]
//               let beforeX = hisItem.x
//               let beforeY = hisItem.y
//               let afterX = item.x
//               let afterY = item.y
//               for (let l = 0; l < hisLayout.length; l++) {
//                 if (hisLayout[l].i !== i) {
//                   let needMoveobj = hisLayout[l]
//                   if (afterY === beforeY && needMoveobj.y === beforeY &&
//                      ((needMoveobj.x >= item.x && needMoveobj.x <= beforeX) || (needMoveobj.x <= item.x && needMoveobj.x >= beforeX))) {
//                     if (item.x > beforeX) {
//                       needMoveobj.x = needMoveobj.x - 1
//                     } else {
//                       needMoveobj.x = needMoveobj.x + 1
//                     }
//                   } else if ((beforeY === 1 && afterY === 0) && ((needMoveobj.y === beforeY && needMoveobj.x < beforeX) || (needMoveobj.y === afterY && needMoveobj.x >= afterX))) {
//                     needMoveobj.x = needMoveobj.x + 1
//                     if (needMoveobj.x > 4) {
//                       needMoveobj.x = 0
//                       needMoveobj.y = needMoveobj.y + 1
//                     }
//                   } else if ((beforeY === 0 && afterY === 1) && ((needMoveobj.y === beforeY && needMoveobj.x > beforeX) || (needMoveobj.y === afterY && needMoveobj.x <= afterX))) {
//                     needMoveobj.x = needMoveobj.x - 1
//                     if (needMoveobj.x < 0) {
//                       needMoveobj.x = 4
//                       needMoveobj.y = needMoveobj.y - 1
//                     }
//                   }
//                 }
//               }
//               hisItem.x = item.x
//               hisItem.y = item.y
//             }
//           }
//         }
//       }
//     }
//     rowAddItem = function (index) {
//       console.log(this.layout1[index])
//       // 如果是第一行
//       if (this.layout1[index].y === 0) {
//         console.log('第一行')
//         for (var i = 0; i < this.layout1.length; i++) {
//           if ((this.layout1[i].y === this.layout1[index].y) && (this.layout1[i].x > this.layout1[index].x)) {
//             this.layout1[i].x += 1
//           }
//         }
//         var x = this.layout1[index].x + 1
//         var y = this.layout1[index].y
//         var zi = (this.layout1.length).toString()
//         var newItem = {'x': x, 'y': y, 'w': 1, 'h': 3, 'i': zi}
//         this.layout1.push(newItem)
//         this.historyLayout1.push(newItem)
//       }
//       // 如果是第二行
//       if (this.layout1[index].y === 3) {
//         console.log('第二行')
//         for (i = 0; i < this.layout1.length; i++) {
//           if ((this.layout1[i].y <= this.layout1[index].y) && (this.layout1[i].x > this.layout1[index].x)) {
//             this.layout1[i].x += 1
//             this.layout1[i].flag = true
//           }
//         }
//         x = this.layout1[index].x + 1
//         y = this.layout1[index].y
//         // console.log(y)
//         i = (this.layout1.length).toString()
//         newItem = {'x': x, 'y': y, 'w': 1, 'h': 3, 'i': i}
//         this.layout1.push(newItem)
//         this.historyLayout1.push(newItem)
//         console.log(this.layout1)
//         console.log(this.historyLayout1)
//       }
//     }
//     colAddItem = function (index) {
//       console.log(this.layout1[index])
//       for (var i = 0; i < this.layout1.length; i++) {
//         if ((this.layout1[i].x === this.layout1[index].x) && (this.layout1[i].y > this.layout1[index].y)) {
//           this.layout1[i].y += 3
//         }
//       }
//       var x = this.layout1[index].x
//       var y = this.layout1[index].y + 3
//       i = (this.layout1.length).toString()
//       var newItem = {'x': x, 'y': y, 'w': 1, 'h': 3, 'i': i}
//       this.layout1.push(newItem)
//       this.historyLayout1.push(newItem)
//     }
// }

// export default MapClass
import vueGridLayout from 'vue-grid-layout'
var GridLayout = vueGridLayout.GridLayout
var GridItem = vueGridLayout.GridItem

export default {
  data () {
    return {
      cardWidth: 1,
      cardHight: 3,
      layout1: [
        {'x': 0, 'y': 0, 'w': 1, 'h': 3, 'i': 0, 'flag': false, 'type': 'card'},
        {'x': 1, 'y': 0, 'w': 1, 'h': 3, 'i': 1, 'flag': false, 'type': 'card'},
        {'x': 2, 'y': 0, 'w': 1, 'h': 3, 'i': 2, 'flag': false, 'type': 'card'},
        {'x': 3, 'y': 0, 'w': 1, 'h': 3, 'i': 3, 'flag': false, 'type': 'card'},
        {'x': 0, 'y': 3, 'w': 1, 'h': 3, 'i': 4, 'flag': false, 'type': 'card'},
        {'x': 1, 'y': 3, 'w': 1, 'h': 3, 'i': 5, 'flag': false, 'type': 'card'},
        {'x': 2, 'y': 3, 'w': 1, 'h': 3, 'i': 6, 'flag': false, 'type': 'card'},
        {'x': 3, 'y': 3, 'w': 1, 'h': 3, 'i': 7, 'flag': false, 'type': 'card'}
        // {'x': 0, 'y': 6, 'w': 100, 'h': 1, 'i': 0, 'flag': false, 'type': 'release'}
        // {"x":2,"y":6,"w":2,"h":6,"i":"4"},
        // {"x":4,"y":6,"w":2,"h":6,"i":"5"},
      ],
      historyLayout1: [
        // {'x': 0, 'y': 0, 'w': 1, 'h': 3, 'i': 0, 'flag': false},
        // {'x': 1, 'y': 0, 'w': 1, 'h': 3, 'i': 1, 'flag': false},
        // {'x': 2, 'y': 0, 'w': 1, 'h': 3, 'i': 2, 'flag': false},
        // {'x': 3, 'y': 0, 'w': 1, 'h': 3, 'i': 3, 'flag': false},
        // {'x': 0, 'y': 3, 'w': 1, 'h': 3, 'i': 4, 'flag': false},
        // {'x': 1, 'y': 3, 'w': 1, 'h': 3, 'i': 5, 'flag': false},
        // {'x': 2, 'y': 3, 'w': 1, 'h': 3, 'i': 6, 'flag': false},
        // {'x': 3, 'y': 3, 'w': 1, 'h': 3, 'i': 7, 'flag': false}
      ],
      release: [
        {name: 'new release'}
      ],
      beforemove: {},
      aftermoved: {},
      formatLayoutVisible: false,
      addDashVisiable: false,
      dialogFormVisible: false,
      curBox: null,
      watch_num: 0,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {

  },
  components: {
    GridLayout,
    GridItem
  },
  methods: {
    moveEvent: function (i, newX, newY) {
      // if (this.move_num === 0) {
      //   this.historyLayout1 = this.layout1
      //   console.log(this.historyLayout1)
      //   this.move_num++
      //   // console.log('第一次移动')
      // }
      // console.log('MOVE i=' + i + ', X=' + newX + ', Y=' + newY)
      // console.log(this.judgeItemPosition(newX, newY))
      this.curBox = i
    },
    movedEvent: function (i, newX, newY) {
      // console.log(this.judgeItemPosition(newX, newY))
      if (this.judgeItemPosition(newX, newY)) {
        this.toChangePosition(i)
        this.watch_num = 0
      }
      // console.log('MOVED i=' + i + ', X=' + newX + ', Y=' + newY)
    },
    deleteItem: function (index) {
      // console.log(index)
      this.layout1.splice(index, 1)
      // this.historyLayout1.splice(index, 1)
    },
    editReleaseName () {
    },
    judgeItemPosition: function (newX, newY) {
      // eslint-disable-next-line camelcase
      console.log(this.historyLayout1)
      var TempLayout = this.historyLayout1
      for (var i = 0; i < TempLayout.length; i++) {
        if (newX === TempLayout[i].x && newY === TempLayout[i].y) {
          // console.log('false')
          return 'false'
        }
      }
      if ((newY % this.cardHight) === 0) {
        // console.log('false')
        return 'false'
      }
      // console.log('true')
      return 'true'
    },
    layoutUpdatedEvent: function (newLayout) {
      console.log('Updated layout: ', newLayout)
      // console.log('Layout1:', this.layout1)
      // this.historyLayout1 = newLayout
    },
    // watchitem 只要moveEvent 函数一调用就更新整个gridlayout
    watchitem (item) {
      // console.log(this.watch_num)
      if (this.watch_num === 0) {
        this.historyLayout1 = JSON.parse(JSON.stringify(this.layout1))
        this.watch_num++
        // console.log('看看都什么时候调用这个函数')
        console.log(this.historyLayout1)
      }
      // console.log('看看都什么时候调用这个函数')
      var historyLayout = JSON.parse(JSON.stringify(this.historyLayout1))
      if (this.curBox !== item.i) {
        // console.log(historyLayout.length)
        for (let j = 0; j < historyLayout.length; j++) {
          if (historyLayout[j].i === item.i) {
            // 目的是假如不是当前移动的card 坐标就变成历史坐标
            // console.log('赋值:' + item.i)
            // console.log('X历史坐标:' + historyLayout[j].x + ' Y历史坐标:' + historyLayout[j].y)
            item.x = historyLayout[j].x
            item.y = historyLayout[j].y
            // console.log('X:' + item.x + ' Y:' + item.y)
          }
        }
      }
      // console.log()
      return item
    },
    resizeEvent: function (i, newH, newW, newHPx, newWPx) {
      console.log('RESIZE i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx)
    },
    toChangePosition: function (i) {
      let layout = this.layout1
      let hisLayout = this.layout1
      for (let j = 0; j < layout.length; j++) {
        if (layout[j].i === i) {
          let item = layout[j]
          for (let k = 0; k < hisLayout.length; k++) {
            if (hisLayout[k].i === i) {
              let hisItem = hisLayout[k]
              let beforeX = hisItem.x
              let beforeY = hisItem.y
              let afterX = item.x
              let afterY = item.y
              for (let l = 0; l < hisLayout.length; l++) {
                if (hisLayout[l].i !== i) {
                  let needMoveobj = hisLayout[l]
                  if (afterY === beforeY && needMoveobj.y === beforeY &&
                           ((needMoveobj.x >= item.x && needMoveobj.x <= beforeX) || (needMoveobj.x <= item.x && needMoveobj.x >= beforeX))) {
                    if (item.x > beforeX) {
                      needMoveobj.x = needMoveobj.x - 1
                    } else {
                      needMoveobj.x = needMoveobj.x + 1
                    }
                  } else if ((beforeY === 1 && afterY === 0) && ((needMoveobj.y === beforeY && needMoveobj.x < beforeX) || (needMoveobj.y === afterY && needMoveobj.x >= afterX))) {
                    needMoveobj.x = needMoveobj.x + 1
                    if (needMoveobj.x > 4) {
                      needMoveobj.x = 0
                      needMoveobj.y = needMoveobj.y + 1
                    }
                  } else if ((beforeY === 0 && afterY === 1) && ((needMoveobj.y === beforeY && needMoveobj.x > beforeX) || (needMoveobj.y === afterY && needMoveobj.x <= afterX))) {
                    needMoveobj.x = needMoveobj.x - 1
                    if (needMoveobj.x < 0) {
                      needMoveobj.x = 4
                      needMoveobj.y = needMoveobj.y - 1
                    }
                  }
                }
              }
              hisItem.x = item.x
              hisItem.y = item.y
            }
          }
        }
      }
    },
    rowAddItem: function (index) {
      console.log(this.layout1[index])
      // 如果是第一行
      if (this.layout1[index].y === 0) {
        console.log('第一行')
        for (var i = 0; i < this.layout1.length; i++) {
          if ((this.layout1[i].y === this.layout1[index].y) && (this.layout1[i].x > this.layout1[index].x)) {
            this.layout1[i].x += 1
          }
        }
        var x = this.layout1[index].x + 1
        var y = this.layout1[index].y
        var zi = (this.layout1.length)
        var newItem = {'x': x, 'y': y, 'w': 1, 'h': 3, 'i': zi}
        this.layout1.push(newItem)
        this.historyLayout1.push(newItem)
      }
      // 如果是第二行
      if (this.layout1[index].y === 3) {
        console.log('第二行')
        for (i = 0; i < this.layout1.length; i++) {
          if ((this.layout1[i].y <= this.layout1[index].y) && (this.layout1[i].x > this.layout1[index].x)) {
            this.layout1[i].x += 1
            this.layout1[i].flag = true
          }
        }
        x = this.layout1[index].x + 1
        y = this.layout1[index].y
        // console.log(y)
        i = (this.layout1.length)
        newItem = {'x': x, 'y': y, 'w': 1, 'h': 3, 'i': i}
        this.layout1.push(newItem)
        this.historyLayout1.push(newItem)
        console.log(this.layout1)
        // console.log(this.historyLayout1)
      }
    },
    colAddItem: function (index) {
      console.log(this.layout1[index])
      for (var i = 0; i < this.layout1.length; i++) {
        if ((this.layout1[i].x === this.layout1[index].x) && (this.layout1[i].y > this.layout1[index].y)) {
          this.layout1[i].y += 3
        }
      }
      var x = this.layout1[index].x
      var y = this.layout1[index].y + 3
      i = (this.layout1.length)
      var newItem = {'x': x, 'y': y, 'w': 1, 'h': 3, 'i': i}
      this.layout1.push(newItem)
      this.historyLayout1.push(newItem)
    }
  },
  // moveEvent: function (i, newX, newY) {
  //   // this.curBox = i
  //   console.log('MOVE i=' + i + ', X=' + newX + ', Y=' + newY)
  //   // this.beforemove = {i: i, x: newX, y: newY}
  // },
  // movedEvent: function (i, newX, newY) {
  //   this.toChangePosition(i)
  //   //    console.log(this.layout)
  //   //    console.log(this.historyLayout)
  //   //    this.historyLayout = this.layout
  //   //    console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
  // },
  handleCommand (param) {
    this.$message(param)
  },
  getTemplate (templateName) {
    return require('../components/' + templateName + '.vue')
  },
  // addDashButton () {
  //   this.addDashVisiable = true
  //   this.$$api_dashBoard_getGadgetList({
  //     data: {queryCriteria: {}},
  //     fn: data => {
  //       this.gadgetList = data.data
  //     },
  //     errFn: (err) => {
  //       this.$message.error(err.msg)
  //     },
  //     tokenFlag: true
  //   })
  // },
  watch: {
  //   layout: {
  //     handler: function (val, oldVal) {
  //       console.log(val)
  //     },
  //     deep: true
  //   }
  }
}
