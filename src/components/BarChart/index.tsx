import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts'
import { SaleSucess } from "../../types/sale";
import { BASE_URL } from "../../utils/requests";
import { round } from "../../utils/format";

type SeriesData = {
    name: string,
    data: number[]
}
type ChartData = {
    labels: {
        categories: string[]
    }
    series: SeriesData[]
}

    const BarChart = () => {
        const [charData, setChartData] = useState<ChartData>({labels:{categories:[]},series:[{name: "",data: []}]}
    )

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`).then(response => {
            const data = response.data as SaleSucess[]
            const myLabels = data.map(x => x.sellerName)
            const mySeries = data.map(x => round(100 * x.deals / x.visited,1))
            setChartData({ 
                labels: {
                    categories:myLabels
                },
                series: [
                    {
                        name: "% Sucesso",
                        data:mySeries
                    }
                ]})
            })
        })
        
        const options = {
            plotOptions: {
                bar: {
                    horizontal: true,
                }
            },
        };
        
        
    return(
        <Chart 
            options={{...options, xaxis:charData.labels}}
            series={charData.series}
            type="bar"
            height="248"
        />
    )
}
export default BarChart