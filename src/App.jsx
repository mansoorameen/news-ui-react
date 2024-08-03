import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MainCard from "./components/MainCard";
import axios from "axios";

const App = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("Technology");
  const [searchQuery, setSearchQuery] = useState("");
  const [source, setSource] = useState("nyTimes");
  const [selectedDate, setSelectedDate] = useState("1900-01-01");
  //   setting the endDate to today's date by default
  // also converting it to the required format for the api
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    // debouncing the api call
    // load the api only after a certain time, saves from  making multiple api calls for each character
    var triggerCall = setTimeout(() => {
      source === "nyTimes" ? getNyTimes() : getGuardian();
    }, 500);

    return () => clearTimeout(triggerCall);
  }, [searchQuery]);

  useEffect(() => {
    source === "nyTimes" ? getNyTimes() : getGuardian();
  }, [source, selectedDate, category]);

  //   Fetch New York Times articles
  const getNyTimes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&begin_date=${selectedDate?.replace(
          /-/g,
          ""
        )}&end_date=${endDate?.replace(
          /-/g,
          ""
        )}&fq=section_name:("${category}")&api-key=${
          import.meta.env.VITE_NY_API_KEY
        }`
      );
      console.log("response", response);
      setNews(response?.data.response.docs);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  //   Fetch Guradian articles
  const getGuardian = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://content.guardianapis.com/search?q=${searchQuery}&page-size=10&from-date=${selectedDate}&to-date=${endDate}&section=${category?.toLowerCase()}&api-key=${
          import.meta.env.VITE_GUARDIAN_API_KEY
        }`
      );
      console.log("Technologu response", response);
      setNews(response?.data?.response?.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  return (
    <>
      {/* contains the search and filters */}
      <Header
        setSearchQuery={setSearchQuery}
        setSelectedDate={setSelectedDate}
        setEndDate={setEndDate}
        setSource={setSource}
        setCategory={setCategory}
      />
      {/* Articles Section */}
      <MainCard news={news} searchQuery={searchQuery} isLoading={isLoading} />
    </>
  );
};

export default App;
