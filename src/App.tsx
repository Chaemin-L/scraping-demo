import { useState } from "react";
import { request } from "./api";
import { load } from "cheerio";
import SearchForm from "./SearchForm";
import "./App.css";

const App = () => {
  const [example, setExample] = useState({
    title: "",
    content: "",
  });

  const getData = async (keyword: string) => {
    request(
      `Product/Search?domain=ALL&query=${encodeURI(
        keyword
      )}&order=RELATION&_searchTarget=TITLE`
    )
      .then((html: any) => {
        const $ = load(html.data);
        const bookSelector = $("ul#yesSchList > li:first a.gd_name");
        const data = {
          bookTitle: bookSelector.text(),
          bookUrl: bookSelector.attr("href"),
        };
        setExample((prev: any) => ({ ...prev, title: data.bookTitle }));
        return data;
      })
      .then((data: any) => {
        request(data.bookUrl).then((html: any) => {
          const $ = load(html.data);
          const data = {
            content: $(
              "div#infoset_pubReivew > div.infoSetCont_wrap > div.infoWrap_txt"
            ).text(),
          };
          setExample((prev: any) => ({
            ...prev,
            content: data.content ? data.content : "출판사 서평이 없습니다",
          }));
        });
      });
  };

  return (
    <div className="app">
      <SearchForm getData={getData} />
      <div className="alert-txt">
        제목을 잘못 입력했을 경우
        <br /> 가장 상단에 노출되는 책의 제목과 서평을 보여줍니다.
      </div>
      <h2 className="book-title">{example.title}</h2>
      <p className="book-review">{example.content}</p>
    </div>
  );
};
export default App;
