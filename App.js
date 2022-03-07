import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get("window");


const App = () => {

  const cardsjson = [
    {
      id: 1,
      name: "A",
      value: "back"
    },
    {
      id: 2,
      name: "B",
      value: "back"
    }
    ,
    {
      id: 3,
      name: "C",
      value: "back"
    }
    ,
    {
      id: 4,
      name: "D",
      value: "back"
    }
    ,
    {
      id: 5,
      name: "E",
      value: "back"
    }
    ,
    {
      id: 6,
      name: "F",
      value: "back"
    }
    ,
    {
      id: 7,
      name: "G",
      value: "back"
    }
    ,
    {
      id: 8,
      name: "H",
      value: "back"
    },
    {
      id: 9,
      name: "A",
      value: "back"
    },
    {
      id: 10,
      name: "B",
      value: "back"
    }
    ,
    {
      id: 11,
      name: "C",
      value: "back"
    }
    ,
    {
      id: 12,
      name: "D",
      value: "back"
    }
    ,
    {
      id: 13,
      name: "E",
      value: "back"
    }
    ,
    {
      id: 14,
      name: "F",
      value: "back"
    }
    ,
    {
      id: 15,
      name: "G",
      value: "back"
    }
    ,
    {
      id: 16,
      name: "H",
      value: "back"
    }
  ]

  const [cards, setCards] = React.useState()
  const [clickCount, setClickCount] = React.useState(0)
  const [score, setScore] = React.useState(0)
  const [firstClickValue, setFirstClickValue] = React.useState()
  const [untouchable, setUntouchable] = React.useState(false)

  React.useEffect(() => {
    setCards(shuffle(cardsjson))
  }, [])

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  function handleClick(selcard) {
    let totalClicks = clickCount + 1

    let newcards = cards.map((card) => {
      if (card.id == selcard.id) {
        card.value = 'face'
        return card
      }
      return card
    })
    setCards(newcards)

    if (totalClicks % 2 == 0) {
      setUntouchable(true)
      setTimeout(() => {
        if (selcard.name == firstClickValue.name) {
          let newcards = cards.map((card) => {
            if (card.id == selcard.id || card.id == firstClickValue.id) {
              return {}
            }
            return card
          })
          setCards(newcards)
          setScore(score + 1)
        } else {
          let newcards = cards.map((card) => {
            card.value = 'back'
            return card
          })
          setCards(newcards)
        }
        setFirstClickValue()
        setUntouchable(false)
      }, 1000);
    } else {
      setFirstClickValue(selcard)
    }
    setClickCount(totalClicks)
  }

  function reset() {
    setCards(shuffle(cardsjson))
    setScore(0)
    setClickCount(0)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={{ height: 80, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, margin: 10, fontWeight: 'bold' }}>CLICKS: {clickCount}</Text>
        <Text style={{ fontSize: 30, margin: 10, fontWeight: 'bold' }}>SCORE: {score}</Text>
      </View>
      {score < 8 ?
        <View pointerEvents={untouchable ? 'none' : 'auto'} style={{ height: height - 220, flexDirection: 'row', width: width, flexWrap: 'wrap', padding: 10, justifyContent: 'center', alignContent: 'center' }}>
          {cards?.map((card, index) => {
            return (
              card.id ? <TouchableOpacity onPress={() => handleClick(card)} key={index} style={{ width: 0.2 * width, height: 0.15 * height, borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', margin: 4, backgroundColor: card.value == 'face'? 'white' : 'lightblue' }}>
                {
                  card.value == 'face' &&
                  <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{card.name}</Text>
                }
              </TouchableOpacity>
                :
                <View key={index} style={{ width: 0.2 * width, height: 0.15 * height, justifyContent: 'center', alignItems: 'center', margin: 4 }}></View>
            )
          })}
        </View>
        :
        <View style={{ height: height - 200, width: width, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 40, fontWeight: 'bold'}}>YOU WON!</Text>
        </View>
      }
      <View style={{ height: 100, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => reset()} style={{width: width*0.4, height: 40, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
          <Text style={{color: 'white', fontSize: 20}}>RESTART</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

export default App;
