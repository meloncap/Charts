
// ---------------- The GraphQL Query ----------------------
const QUERY = ` 
{
  ethereum(network: ethereum) {
    dexTrades(
      options: {limit: 100, asc: "timeInterval.minute"}
      date: {since: "2021-05-23", till: "2022-06-11"}
      exchangeName: {is: "Uniswap"}
      baseCurrency: {is: "0x910985ffa7101bf5801dd2e91555c465efd9aab3"}
      quoteCurrency: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}
    ) {
      timeInterval {
        minute(count: 5)
      }
      baseCurrency {
        symbol
        address
      }
      baseAmount
      quoteCurrency {
        symbol
        address
      }
      quoteAmount
      trades: count
      quotePrice
      maximum_price: quotePrice(calculate: maximum)
      minimum_price: quotePrice(calculate: minimum)
      open_price: minimum(of: block, get: quote_price)
      close_price: maximum(of: block, get: quote_price)
    }
  }
}
`;

// -------- Endpoint ----------------------
const endpoint = "https://graphql.bitquery.io/";

// Function which fetches the data from the API
async function fetchData(){  
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "BQYpEoddVosdUgcZtL5PvU1DR6OiGLEx"
    },
    body: JSON.stringify({
        query: QUERY
    })
  });  
  
  const data = await response.json(); 

  // ------------------------------------------- Lightweight chart ------------------------------------------------------
  const chart = LightweightCharts.createChart(document.body, { width: 390, height: 400 });
  
  const lineSeries = chart.addLineSeries();
  
  lineSeries.applyOptions({
    color: '#27AE60',
    lineWidth: 1,
  });

  chart.applyOptions({
    watermark: {
        color: '#F4D03F',
        visible: true,
        text: 'Chart Example By Joe',
        fontSize: 34,
        horzAlign: 'center',
        vertAlign: 'center',
    },    
  })
  
  
