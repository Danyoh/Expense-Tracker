# Salesforce Expense Tracker
Part of the Salesforce Mini Hacks 2023

Mega Hack

In this mega hack, you build an app that lets you track your expenses and visualize them. You will be using a combination of Custom Objects, Flows, Lightning Web Components, and Apex to complete this hack.

Requirements

    Create an object to store expenses and load the data from the below CSV file into the object.
        CSV file: Mock Expense Data.csv (provided)
        Hint: [Use the Custom Object from Spreadsheet feature.](https://help.salesforce.com/s/articleView?language=en_US&id=sf.dev_objectcreate_task_lex_from_spreadsheet.htm&type=5)
    Create a flow that lets users select a Start Date and an End Date on the first screen, both of which are required.
    The next screen must show a Lightning Web Component that displays a donut chart using the [Chart.js library](https://www.chartjs.org/docs/latest/). You can download chartJS.js file from LWC Recipes. The donut chart must show the Total amount spent grouped by Expense Type for the duration selected in the previous screen.
        Hint: Refer to the libsChartjs recipe for guidance on using the Chart.js library
    The component must also display a button called “Save as Image” that saves the chart as an image in Salesforce Files, with the nameExpenses-[startdate]-[enddate].png. Use the format yyyy_MM_dd for the dates in the name of the image.
        Hint: Use the built-in toBase64Image function of the Chart.js library
        Hint: Use the ContentVersion object to store the image in Salesforce Files.
