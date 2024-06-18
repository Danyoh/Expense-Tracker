import { LightningElement, api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/chartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import getExpenses from '@salesforce/apex/ExpenseCtrl.getExpenses';
import saveAsFile from '@salesforce/apex/ExpenseCtrl.saveAsFile';
/**
 * When using this component in an LWR site, please import the below custom implementation of 'loadScript' module
 * instead of the one from 'lightning/platformResourceLoader'
 *
 * import { loadScript } from 'c/resourceLoader';
 *
 * This workaround is implemented to get around a limitation of the Lightning Locker library in LWR sites.
 * Read more about it in the "Lightning Locker Limitations" section of the documentation
 * https://developer.salesforce.com/docs/atlas.en-us.exp_cloud_lwr.meta/exp_cloud_lwr/template_limitations.htm
 */

const generateRandomNumber = () => {
    return Math.round(Math.random() * 100);
};

export default class LibsChartjs extends LightningElement {
    error;
    chart;
    chartjsInitialized = false;

    @api startDate;
    @api endDate;

    config = {
        type: 'doughnut',
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };

    async renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;

        try {
            await loadScript(this, chartjs);
            const data = {
                datasets: [
                    {
                        data: [],
                        backgroundColor: [],
                        label: 'Dataset 1'
                    }
                ],
                labels: []
            };
            const expenseResult = await getExpenses({
                startDate: this.startDate,
                endDate: this.endDate
            });
            expenseResult.forEach(element => {
                data.datasets[0].data.push(element.TotalAmount);
                data.datasets[0].backgroundColor.push(this.randomRGB());
                data.labels.push(element.Expense_Type__c);
  
            });
            
            this.config.data = data;
            const canvas = document.createElement('canvas');
            this.template.querySelector('div.chart').appendChild(canvas);
            const ctx = canvas.getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
        } catch (error) {
            this.error = error;
        }
    }

    //Random colour generator
    randomRGB() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        return "rgb(" + x + "," + y + "," + z + ")";
    }

    //Button click handler
    async generateImage() {
        const generatedImage= this.chart.toBase64Image();
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);

        const sdFormat = startDate.getFullYear() + "_" + (startDate.getMonth()+1) + "_" + startDate.getDate();
        const edFormat = startDate.getFullYear() + "_" + (startDate.getMonth()+1) + "_" + startDate.getDate();

        console.log(generatedImage);
        console.log(sdFormat);
        console.log(edFormat);

        const saveResult = saveAsFile({
            base64Image: generatedImage.split(',')[1],
            title: `Expense-${sdFormat}-${edFormat}` 
        })
    }

}
