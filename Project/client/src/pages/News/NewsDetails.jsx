import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newsImg from "../../assets/News.png";



const NewsDetails = () => {
  const { state: report } = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("English");

  if (!report)
    return <p className="text-center mt-20 text-lg">Report not found</p>;

  // 🌍 Long content (demo until admin upload feature is ready)
  const englishContent = `
Education is changing fast because of new tools and ideas. Today many schools and colleges use computers, apps, and smart systems to help students learn. This article explains, in simple words, how modern tools help teaching and learning. It also talks about the good things and the problems we must solve.

First, learning now can be personal. In old days the same lesson was given to every student. But now digital tools can show different lessons to different students. If one student finds a topic easy, the tool gives harder exercises. If another student finds it hard, the tool gives simpler steps and more examples. This idea is called personalized learning. It helps students move at their own speed. They do not feel left behind or bored.

Second, teachers get strong help. Good teachers are still very important. But digital tools save time on tasks like marking homework or making practice tests. Teachers can use this saved time to explain hard ideas, talk with students one by one, or plan better lessons. Tools can also show teachers which students need more help. This makes teaching more focused and better for students.

Third, learning is not just books. Students use videos, games, and small projects. Videos can show things that are hard to see in a classroom, like how a machine works or a science experiment. Games make practice fun and keep students trying again. Small projects let students solve real problems. This makes learning active and useful for life.

Fourth, tools help students practice again and again. When a student practices many times, the brain remembers better. Many apps give short practice with quick feedback. Quick feedback is important. It tells the student where they made a mistake and how to fix it. This makes learning faster.

Fifth, students can learn from anywhere. A student in a small town can watch lessons from a top teacher far away. This lowers barriers. Many good courses are free or low cost online. This helps students who cannot go to big schools. It also helps adult learners who study while working.

Sixth, data and reports help schools make smart choices. When apps collect simple data (like which questions many students miss), schools can find weak points in planning. They can update the syllabus, give training to teachers, or give special lessons. This makes the whole system better step by step.

But there are problems. First, not all students have the same access to devices or internet. If a student has no device or weak internet, they cannot use online tools well. This creates a gap between students who have devices and those who do not. So, schools and governments must give good internet and devices to all.

Second, too much screen time is not good. Students still need play, group work, and face-to-face talk. Balance is important. Teachers should mix online lessons with class work, discussion, and real projects.

Third, privacy and safety matter. Tools collect student data. We must keep this data safe and use it only for learning. Rules and clear policies are needed so data is not misused.

Fourth, teachers need training. New tools need new skills. Teachers must learn how to use tools well and how to combine them with good teaching methods. Training must be regular and practical.

Fifth, tools must support local languages and culture. If tools use only one language, many students will be left out. Content must be in many languages and match local contexts.

Sixth, cost is a worry for some schools. Good systems cost money for software, devices, and training. Governments and schools must plan budgets and find low-cost options.

To finish, technology makes learning more flexible, more personal, and more fun. It gives tools for students and teachers to do better work. But the change must be fair. All students must get access to devices and good internet. Teachers must get training. Privacy must be safe. When these problems are solved, technology will make education stronger for everyone.



`;

  const hindiContent = `
शिक्षा में आज बहुत तेज़ी से बदलाव हो रहा है क्योंकि नए औज़ार और विचार आ रहे हैं। आज कई स्कूल और कॉलेज कंप्यूटर, ऐप और स्मार्ट सिस्टम का उपयोग करते हैं ताकि छात्र बेहतर तरीके से सीख सकें। यह लेख सरल भाषा में बताता है कि आधुनिक औज़ार कैसे पढ़ाने और सीखने में मदद करते हैं और किन समस्याओं का समाधान ज़रूरी है।

पहला, अब सीखना व्यक्तिगत हो गया है। पहले हर छात्र को एक जैसा पाठ पढ़ाया जाता था। अब डिजिटल टूल अलग-अलग छात्रों को अलग-अलग पाठ दिखा सकते हैं। अगर कोई छात्र किसी विषय को जल्दी समझता है तो उसे कठिन अभ्यास दिया जाता है। अगर किसी छात्र को मुश्किल होती है तो उसे आसान कदम और ज़्यादा उदाहरण दिए जाते हैं। इसे पर्सनलाइज़्ड लर्निंग कहा जाता है। इससे छात्र अपनी गति से सीख सकते हैं और कोई पीछे नहीं रह जाता।

दूसरा, अध्यापक को मज़बूत मदद मिलती है। अच्छे अध्यापक अब भी बहुत ज़रूरी हैं, लेकिन डिजिटल टूल उनका समय बचाते हैं। अब अध्यापक अपना ज़्यादा समय कठिन विषय समझाने और छात्रों की मदद करने में लगा सकते हैं। इससे पढ़ाई ज़्यादा असरदार होती है।

तीसरा, सीखना अब केवल किताबों तक सीमित नहीं है। छात्र वीडियो, गेम और छोटे प्रोजेक्ट का उपयोग करते हैं। वीडियो उन चीज़ों को दिखाते हैं जो कक्षा में देखना कठिन है। गेम अभ्यास को मज़ेदार बनाते हैं और छात्र बार-बार कोशिश करते रहते हैं। छोटे प्रोजेक्ट वास्तविक जीवन की समस्याएँ हल करने में मदद करते हैं।

चौथा, टूल छात्रों को बार-बार अभ्यास करने में मदद करते हैं। जितना ज़्यादा अभ्यास होगा, दिमाग उतना बेहतर याद रखेगा। कई ऐप छोटे-छोटे अभ्यास देते हैं और तुरंत परिणाम दिखाते हैं जिससे सीखना तेज़ होता है।

पाँचवाँ, अब छात्र कहीं से भी सीख सकते हैं। कोई भी छात्र छोटे शहर से भी किसी अच्छे अध्यापक की क्लास देख सकता है। कई कोर्स ऑनलाइन मुफ्त या कम दाम में मिलते हैं। इससे शिक्षा सबके लिए सुलभ बनती है।

छठा, डेटा और रिपोर्ट से स्कूल बेहतर निर्णय ले सकते हैं। जब ऐप डेटा इकट्ठा करते हैं तो स्कूल यह देख सकते हैं कि कौन से विषय में छात्रों को दिक्कत है और सुधार कर सकते हैं।

लेकिन कुछ समस्याएँ हैं। पहला, सभी छात्रों के पास इंटरनेट या उपकरण नहीं हैं। इससे अमीर और गरीब छात्रों के बीच अंतर बढ़ सकता है। सरकार और स्कूलों को सभी छात्रों को डिवाइस और अच्छा इंटरनेट देना चाहिए।

दूसरा, बहुत अधिक स्क्रीन समय अच्छा नहीं होता। छात्रों को खेल, समूह कार्य और आमने-सामने की बातचीत भी करनी चाहिए ताकि वे संतुलित रहें।

तीसरा, सुरक्षा और गोपनीयता ज़रूरी है। टूल छात्रों का डेटा इकट्ठा करते हैं, इसलिए यह ज़रूरी है कि इसे सुरक्षित रखा जाए और केवल पढ़ाई के लिए उपयोग किया जाए।

चौथा, अध्यापकों को प्रशिक्षण चाहिए ताकि वे नए टूल का सही उपयोग कर सकें।

पाँचवाँ, टूल को स्थानीय भाषाओं का समर्थन करना चाहिए ताकि हर छात्र उसे समझ सके।

अंत में, तकनीक शिक्षा को लचीला, व्यक्तिगत और मज़ेदार बनाती है। लेकिन सभी को इसका लाभ तभी मिलेगा जब इंटरनेट, डिवाइस और प्रशिक्षण सबको समान रूप से उपलब्ध होंगे। तब शिक्षा सबके लिए मज़बूत और बेहतर बनेगी।

`;

  return (
    <section className="bg-[#F9FAFB] text-[#124734] py-16 font-[Open_Sans,sans-serif]">
      {/* ---------------- Header ---------------- */}
           <div className="bg-[#1E5631] text-white w-full py-10">
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8">
               <div className="w-full md:w-1/2 pr-8">
                 <p className="text-sm mb-3 text-gray-200">Home &gt; News</p>
                 <h1 className="font-semibold text-4xl mb-3 leading-snug">
                   Latest News & Updates
                 </h1>
                 <p className="text-[#B7F399] text-lg font-medium">
                   Stay updated with the newest events, announcements, and stories 
                   from the academic and professional world.
                 </p>
               </div>
               <div className="w-full md:w-1/2 flex justify-end mt-8 md:mt-0">
                 <img
                   src={newsImg}
                   alt="News"
                   className="max-w-[16rem] md:w-[350px] rounded-lg shadow-md"
                 />
               </div>
             </div>
           </div>
     

      {/* ---------------- Report Content ---------------- */}
      <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6 relative">
        {/* Top Right Language Toggle */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setLanguage("English")}
            className={`px-4 py-1 rounded-md border text-sm font-medium transition-all duration-200 ${
              language === "English"
                ? "bg-[#A7E1B2] text-black border-[#A7E1B2]"
                : "bg-white text-black border-gray-300 hover:bg-[#A7E1B2]"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("Hindi")}
            className={`px-4 py-1 rounded-md border text-sm font-medium transition-all duration-200 ${
              language === "Hindi"
                ? "bg-[#A7E1B2] text-black border-[#A7E1B2]"
                : "bg-white text-black border-gray-300 hover:bg-[#A7E1B2]"
            }`}
          >
            Hindi
          </button>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-[#1E5631] mb-6 text-sm font-semibold hover:underline"
        >
          ← Back
        </button>

        {/* Title */}
       <h2 className="text-3xl font-bold text-[#124734] mb-2 border-b border-gray-300 pb-2">
  {report.title}
</h2>


        {/* Dynamic Content */}
        <div className="text-gray-800 leading-relaxed whitespace-pre-line text-[15px] mt-2">
          {language === "English" ? englishContent : hindiContent}
        </div>
        {/* Download PDF Button */}



      </div>
    </section>
  );
};

export default NewsDetails;
