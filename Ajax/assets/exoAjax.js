async function getQuote(){

    let answer = await fetch( "https://thatsthespir.it/api");
    let quote = answer.json();
    return quote;
}

let quoteContent = document.getElementById("quote");
let authorContent = document.getElementById("author");
let imgContainer = document.getElementById("imgContainer");
getQuote().catch(async error => console.error(error)).then(quote => {
    quoteContent.innerHTML = JSON.stringify(quote.quote);
    authorContent.innerHTML = JSON.stringify(quote.author);
    imgContainer.innerHTML = '<img src ="' + quote.photo + '" alt="' + quote.slug + '" >'
    
});
console.log(getQuote());
