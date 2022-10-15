import {useEffect, useState} from "react"
import axios from "axios"
import InfiniteScroll from 'react-infinite-scroll-component';
import './newsApp.css'

const CATAGORIES = ["business","entertainment","general","health", "science","sports","technology"]

const NewsApplication = () => {

    const [articles,setArticles] = useState([])
    const [pageNumber , setPageNumber] = useState(1)
    const [totalRecords,setTotalRecords] = useState(0)
    const [Category,setCategory] = useState("general")

    const getTheNews = (pageNo) => {
        axios({
            url : "https://newsapi.org/v2/top-headlines",
            method : "GET",
            params : {
                country : "in",
                apiKey : "a62cce7ea419462e8031c5d50e267fb2",
                page : pageNo ,
                category : Category
            }
        })
        .then((response) => {
            setArticles([...articles , ...response.data.articles])
            setPageNumber(pageNo)
            setTotalRecords(response.data.totalResults)
            console.log(pageNo)
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    useEffect(() => {
        getTheNews(pageNumber)
    } , [])

    useEffect(() => {
        getTheNews(pageNumber)
    } , [Category])

    const fetchData = () => {
        getTheNews(pageNumber + 1)
    }
    const handleChangeCategory = (catag) => {
        setArticles([])
        setTotalRecords(0)
        setPageNumber(1)
        setCategory(catag)
        console.log(catag)
    }
    return(
        <div>
        <div className="newsHeadingContainer">
        <h1 className="newsHeading">Times news <span className="special">.LIVE</span></h1> 
        <div>
            {CATAGORIES.map((catag,index) => {
                return <button key={index} style={{margin:5}} className={catag === Category ? "btn btn-success" : "btn btn-primary"} 
                onClick={()=>{handleChangeCategory(catag)}}>{catag}</button>
            })}
        </div>
        </div>

        <div >

        <InfiniteScroll 
        style={{display:"flex", flexWrap:"wrap" , textAlign:"center" , padding:"10px"}} 
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length !== totalRecords}
        loader={<h4>Loading...</h4>}>
         
        
        {articles.map((article,index) => {
            return(
                <div style={{width: 300 }} className="news-container-box" key={index}>
                <h1 className="heading">{article.title}</h1>
                <img src = {article.urlToImage} style={{width:300}} alt={article.title}/>
                <p className="paragraph">{article.description}</p>
                <button className="btn btn-primary"> <a href = {article.url} className="aText" rel="noreferrer" target="_blank">Get Details</a></button>
                </div>
            )
        })}
  
        
       </InfiniteScroll>
        
        
        
        </div>

        </div>
    )
}

export default NewsApplication