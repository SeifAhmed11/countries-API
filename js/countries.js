var   output = document.getElementById("countries"),
        inpsearch = document.getElementById("inp-search"),
        select = document.getElementById("select"),
        sel = document.querySelector(".sel");


    // document.getElementById("bsearch").disabled = false;


    window.addEventListener("load" , ()=>{
        countries();
    } )



    inpsearch.addEventListener("change",()=>{
        let searchquery = inpsearch.value;
        countries(searchquery);
    })
    
    select.addEventListener("change",()=>{
        let ell;
        ell = select.value;
        console.log(ell)
        countries("query" ,ell);
    })


    

async function countries(query , selectquery)
{
    let res;
    if(selectquery=="all"){
        res = await fetch(`https://restcountries.com/v3.1/all`)
    }
    else if(selectquery){
        res = await fetch(`https://restcountries.com/v3.1/region/${selectquery}`)
    }
    else if(query){
        res = await fetch(`https://restcountries.com/v3.1/name/${query}`)
    } else{
        res = await fetch(`https://restcountries.com/v3.1/all`)
    }

    let results = await res.json();

    output.innerHTML=""

    results .map(result =>{

        const htmlString =
        `
        <img src=${result.flags.png} alt=${result.name.common} style="width:100%">
        <div class="container">
            <h4>Name : <span> ${result.name.common} </span></h4> 
            <p>population : <span> ${result.population} </span></p> 
            <p>region : <span> ${result.region} </span></p> 
            <p>capital : <span> ${result.capital} </span></p> 
        </div>
        `

        let outstring = document.createElement("div")
        outstring.classList.add("card")
        outstring.innerHTML=htmlString
        output.appendChild(outstring)

        outstring.addEventListener("click", ()=>{
            countr(result)
        })

    })
}

async function countr(result){
    output.innerHTML=""
    console.log(result.population)
    const htmlString =
        `
        <img src=${result.flags.png} alt=${result.name.common} style="width:80%" >
        <div class="container-right">
            <div class="container-top">
                <div class="container">
                    <h1><span> ${result.name.common} </span></h4> 
                    <p>population : <span> ${result.population} </span></p> 
                    <p>region : <span> ${result.region} </span></p> 
                    <p>capital : <span> ${result.capital} </span></p> 
                </div>
            </div>
            <div class="container-bottom">
            <h3>borders : </h3> 
                ${result.borders}
            </div>
        </div>
        <div class="button">beack</div>
        `

        let outstring = document.createElement("div")
        outstring.classList.add("card2")
        outstring.innerHTML=htmlString
        output.appendChild(outstring)

        outstring.addEventListener("click", ()=>{
            countries()
        })
}




