import React, { useEffect } from 'react'; 
import './transaltion.scss'; // Import the SCSS file
import { IoRestaurantOutline } from "react-icons/io5"; // Restaurant icon
import { TbBrandHipchat } from "react-icons/tb"; // Chat icon
import { MdDirections } from "react-icons/md"; // Icon for directions

const Conversation = () => {
  useEffect(() => {
    // Preload voices when the component mounts
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const conversations = [
    {
      title: "Saying Hello",
      phrases: [
        { japanese: "こんにちは", english: "Hello", pronunciation: "konnichiwa" },
        { japanese: "お元気ですか？", english: "How are you?", pronunciation: "ogenki desu ka?" },
        { japanese: "ありがとうございます", english: "Thank you", pronunciation: "arigatou gozaimasu" },
        { japanese: "さようなら", english: "Goodbye", pronunciation: "sayonara" },
      ],
      image: <TbBrandHipchat style={{ fontSize: '100px' }} />, // Larger icon
    },
    {
      title: "Asking About Prices",
      phrases: [
        { japanese: "これはいくらですか？", english: "How much is this?", pronunciation: "kore wa ikura desu ka?" },
        { japanese: "値段を教えてください", english: "Can you tell me the price?", pronunciation: "nedan o oshiete kudasai" },
      ],
      image: <MdDirections style={{ fontSize: '100px' }} />, // Directions icon
    },
    {
      title: "In a Restaurant",
      phrases: [
        { japanese: "メニューをお願いします", english: "Could I have the menu?", pronunciation: "menyuu o onegaishimasu" },
        { japanese: "水をください", english: "Please give me water.", pronunciation: "mizu o kudasai" },
        { japanese: "お勧めは何ですか？", english: "What do you recommend?", pronunciation: "osusume wa nan desu ka?" },
        { japanese: "お会計をお願いします", english: "Could I get the bill?", pronunciation: "okaikei o onegaishimasu" },
      ],
      image: <IoRestaurantOutline style={{ fontSize: '100px' }} />, // Restaurant icon
    },
    {
      title: "Asking About Directions",
      phrases: [
        { japanese: "駅はどこですか？", english: "Where is the station?", pronunciation: "eki wa doko desu ka?" },
        { japanese: "右に曲がってください", english: "Please turn right.", pronunciation: "migi ni magatte kudasai" },
        { japanese: "この道をまっすぐ行ってください", english: "Please go straight down this road.", pronunciation: "kono michi o massugu itte kudasai" },
        { japanese: "近くにトイレはありますか？", english: "Is there a toilet nearby?", pronunciation: "chikaku ni toire wa arimasu ka?" },
      ],
      image: <MdDirections style={{ fontSize: '100px' }} />, // Larger directions icon
    },
  ];

  const handleSpeak = (text, lang) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return (
    <div className="conversation-container">
      <div style={{ height: '120px' }}></div>
      <h1>Japanese Conversations</h1>
      {conversations.map((category, index) => (
        <div key={index} className="conversation-section">
          <h2>{category.title}</h2>
          <div className="conversation-content">
            <div className="conversation-text">
              {category.phrases.map((conv, idx) => (
                <div key={idx} className="conversation-item">
                  <div className="conversation-item-content">
                    <p className="japanese-text">{conv.japanese}</p>
                    <p className="pronunciation-text">({conv.pronunciation})</p>
                    <p className="english-text">{conv.english}</p>
                  </div>
                  <div className="button-group">
                    <button onClick={() => handleSpeak(conv.japanese, 'ja-JP')}>🔊 Hear Japanese</button>
                    <button onClick={() => handleSpeak(conv.english, 'en-US')}>🔊 Hear English</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="conversation-image">
              {category.image && typeof category.image === 'string' ? (
                <img src={`./images/${category.image}`} alt={category.title} />
              ) : (
                category.image // Render the icon for "Asking About Directions"
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Conversation;
