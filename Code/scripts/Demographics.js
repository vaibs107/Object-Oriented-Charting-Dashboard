let ctx = document.getElementById("myChart");
let c = document.getElementById("newChart");

var dataframeSet = 0;
var objArr = [];
var currentDataSet = "";

/*
1. Function to import the datasets
*/
function importData(){
	let DataFrame = dfjs.DataFrame;
    var vals = document.getElementById("datasets");
    currentDataSet = vals.options[vals.selectedIndex].value;
    DataFrame.fromCSV(currentDataSet).then(df => 
    {
        data = df.toJSON('SAT.json');        
        loadData(data);
    });
}

/*
2. Function to load the datasets on the website for further use
*/
function loadData(dataset) {
    var blob = new Blob([data],{ type:"text/ApplicationJson;charset:utf-8" });
    dataframeSet = dataset;
    createTableFromJSON();
}

/*
3. Function to prepare the table with styles, 
   column headers and column data for displaying the data
*/
function createTableFromJSON() {
	var colData = [];
	var div = document.getElementById('table');	
	createTableStyle(div);
	if(div) {
		div.innerHTML = "";
	}
	var data = JSON.parse(dataframeSet);
	for (var i = 0; i < data.length; i++) {
		for (var key in data[i]) {
			if (colData.indexOf(key) === -1) {
				colData.push(key);
			}
		}
	}
	var Columns = createColumnHeaderForTable(colData);
	new FancyGrid({
		title: 'Dataset',
		renderTo: 'table',
		width: 1300,
		height: 400,
		data: data,
		defaults: {
		  type: 'string',
		  width: 100,
		  sortable: false,
		  filter: {
			header: true,
			emptyText: ''
		  }
		},
		clicksToEdit: 1,
		columns: Columns.columns,
		events: [{
			init: function(){
			createFilterElements();
			createObjects(colData);
			}
		}]
	});
}

/*
4. Function to create table style
*/
function createTableStyle(div1) {
	div1.style.width = "100%";
	div1.style.paddingBottom = "75px";
}

/*
5. Function to column headers for table showing the data
*/
function createColumnHeaderForTable(col) {
	var columnSet = {};
	var columns = [];
	columnSet.columns = columns;
	for(var i=0; i <col.length; i++) {
		var column = {
			"index": col[i],
			"title": col[i]
		}
		columnSet.columns.push(column);
	}
	return columnSet;
}

/*
6. Function to create filter elements
*/	
function createFilterElements() {
	var filter = document.createElement('div');
	filter.id = 'select-column';
	var divContainer = document.getElementById("filter");
    divContainer.innerHTML = "";
    divContainer.appendChild(filter);
	createFilter();
}	

/*
7. Function to create objects for the number of records in the dataset
*/
function createObjects(colHeaderValues) {
	if(currentDataSet == "diversityindex.csv"){
		createDiversityIndexObjects(colHeaderValues);
	} else if(currentDataSet == "incomeByOccupation.csv"){
		createIncomeOccupationObjects(colHeaderValues);
	} else if(currentDataSet == "jobCategory.csv"){
		createJobCategoryObjects(colHeaderValues);
	} else if(currentDataSet == "populationByZip.csv"){
		createPopulationByZipObjects(colHeaderValues);
	}
}

/*
8. Function added to create filter functionality
*/
function createFilter() {
	var select_column_div = document.getElementById("select-column");	
	createHeader(select_column_div,"Please Select The Data Labels(Columns)");	
	var br = document.createElement('br');
	select_column_div.appendChild(br);
	var json = getParsedJson();
	for(var i = 0 ; i < json.length; i++){
		for (var key in json[i]) {
			createCheckbox(key,"select-column");
		}
		break;
	}
	createFilterStyles(select_column_div);
	createAddFilterButton(select_column_div);
}

/*
9. Function to create object for the Diversity Index dataset
*/
function createDiversityIndexObjects(colHeaderValues) {
	var json = getParsedJson();
	for(var i = 0 ; i < json.length; i++){
		var record = json[i];
		let diversityIndexObject = new DiversityIndexObject(record[colHeaderValues[0]],
															record[colHeaderValues[1]],
															record[colHeaderValues[2]],
															record[colHeaderValues[3]],
															record[colHeaderValues[4]],
															record[colHeaderValues[5]],
															record[colHeaderValues[6]],
															record[colHeaderValues[7]],
															record[colHeaderValues[8]]);
		
		objArr.push(diversityIndexObject);
	}
}

/*
10. Function to create object for the Income by occupation dataset
*/
function createIncomeOccupationObjects(colHeaderValues) {
	var json = getParsedJson();
	for(var i = 0 ; i < json.length; i++){
		var record = json[i];
		let incomeOccupationObject = new IncomeOccupationObject(record[colHeaderValues[0]],
															record[colHeaderValues[1]],
															record[colHeaderValues[2]],
															record[colHeaderValues[3]],
															record[colHeaderValues[4]],
															record[colHeaderValues[5]],
															record[colHeaderValues[6]]);
		
		objArr.push(incomeOccupationObject);
	}
}

/*
11. Function to create object for the Job Category by Company and Race dataset
*/
function createJobCategoryObjects(colHeaderValues){
	var json = getParsedJson();
	for(var i = 0 ; i < json.length; i++){
		var record = json[i];
		let jobCategoryObject = new JobCategoryObject(record[colHeaderValues[0]],
															record[colHeaderValues[1]],
															record[colHeaderValues[2]],
															record[colHeaderValues[3]],
															record[colHeaderValues[4]],
															record[colHeaderValues[5]]);
		
		objArr.push(jobCategoryObject);
	}
}

/*
12. Function to create object for the Population by Zipcode dataset
*/
function createPopulationByZipObjects(colHeaderValues){
	var json = getParsedJson();
	for(var i = 0 ; i < json.length; i++){
		var record = json[i];
		let populationByZipObject = new PopulationByZipObject(record[colHeaderValues[0]],
															record[colHeaderValues[1]],
															record[colHeaderValues[2]],
															record[colHeaderValues[3]],
															record[colHeaderValues[4]],
															record[colHeaderValues[5]]);
		
		objArr.push(populationByZipObject);
	}
}

/*
13. Function to create the header for the filters
*/ 
function createHeader(divId,headerLabel) {
	var heading = document.createElement('label');
	heading.style.fontWeight = 'bold';
	heading.innerHTML=headerLabel;
	divId.appendChild(heading);
	divId.appendChild(document.createElement('br'));
}

/*
14. Function to get parsed JSON value of currently selected dataset
*/ 
function getParsedJson() {
	return JSON.parse(dataframeSet);
}

/*
15. Function to create checkbox for data column selection
*/
function createCheckbox(columnName, parentDivId) {
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = columnName;
	checkbox.value = "0"; 
	checkbox.id = columnName;
	createCheckboxStyles(checkbox);
	var label = document.createElement('label')
	label.htmlFor = "id";
	label.appendChild(document.createTextNode(columnName));
	var divContainer = document.getElementById(parentDivId);
	if(divContainer){
		divContainer.appendChild(label);
		divContainer.appendChild(checkbox);
	}	
}

/*
16. Function to create filter styles
*/
function createFilterStyles(col_div) {
	var br = document.createElement('br');
	col_div.style.fontFamily = "Century Gothic";
	col_div.style.fontWeight = "bold";
	col_div.appendChild(br);
}

/*
17. Function to create "Add Filter" button for filter
*/
function createAddFilterButton(select_column_div) {
	var addFilterButton = document.createElement('input');
	addFilterButton.setAttribute('type','button');
	addFilterButton.setAttribute('id', 'addFilter');
	addFilterButton.setAttribute('name','addFilterButton');
	addFilterButton.setAttribute('value','Add Filter');
	addFilterButton.addEventListener('click', function(event){createDivAnimation()});
	addFilterButton.addEventListener('click',function(event){createRowFilters()});
	select_column_div.appendChild(document.createElement("br"));
	select_column_div.appendChild(addFilterButton);
}

/*
18. Function to create checkbox styles
*/
function createCheckboxStyles(chbk) {
	chbk.style.marginRight = "45px";
	chbk.style.marginLeft = "10px";
}

/*
19. Function to create div animations
*/
function createDivAnimation() {
	var secondDivId = document.getElementById('filter-row');
	secondDivId.style.fontFamily = "Century Gothic";
	secondDivId.style.fontWeight = "bold";	
}

/*
20. Function to Create Row Filters
*/
function createRowFilters() {
	var divContainer = document.getElementById('categorical-filter-checkbox');
	divContainer.innerHTML = "";
	document.getElementById("filter-row").hidden=false;
	var checkedCategorisedColumnsSet = getCheckedCategorisedColumns();
	for (const value of checkedCategorisedColumnsSet) {		
		var selectDiv = document.createElement("div");
		selectDiv.style.marginTop = "14px";
		selectDiv.style.marginRight = "24px";
		
		var select = document.createElement("select");
		select.id = value;
		select.multiple = true;
		select.style.width = "180px";
		select.style.overflowX = "auto";		
		
		var selectLabel = document.createElement('label')
		selectLabel.htmlFor = "id";
		selectLabel.appendChild(document.createTextNode(value));
		
		var categoryValueSet = getAllValuesForCategory(value);
		for (const value of categoryValueSet) {
			var option = document.createElement("option");
			option.value = value;
			option.selected ="";
			option.innerHTML = value;
			select.add(option);
		}
		selectLabel.append(document.createElement("br"));
		selectLabel.append(select);
		selectDiv.appendChild(selectLabel);
		divContainer.append(selectDiv);				
	}
}

/*
21. Function to get selected column names
*/
function getCheckedCategorisedColumns() {
	let checkedCategorisedColumnSet = new Set();
	var categorisedColumnsSet = getAllCategorisedColumnSet();
	for (const value of categorisedColumnsSet) {		
		if(isColumnSelected(value)){
			checkedCategorisedColumnSet.add(value);
		}
	}	
	return checkedCategorisedColumnSet;
}

/*
22. Function to get all the values for particular category
*/
function getAllValuesForCategory(categoryName) {
	let categoryValueSet = new Set();
	var json = getParsedJson();
	for(var i = 0 ; i < json.length; i++){
		for (var key in json[i]) {
			var columnName = key;
			var columnValue = json[i][key];
			if(categoryName == columnName) {
				categoryValueSet.add(columnValue);
			}
		}
	}	
	return categoryValueSet;
}

/*
23. Function to get all categorised value for selected columns
*/
function getAllCategorisedColumnSet() {
	let categorisedColumnsSet = new Set();
	var json = getParsedJson();
	for(var i = 0 ; i < json.length; i++){
		for (var key in json[i]) {
			var columnName = key;
			var columnValue = json[i][key];
			if((columnName != null && columnName != '') && isNaN(columnValue)){
				categorisedColumnsSet.add(columnName);
			} else if(categorisedColumnsSet.size == json[i].length){
				return categorisedColumnsSet;
			}
		}	
	}		
	return categorisedColumnsSet;
}

/*
24. Function to check if a column is selected
*/
function isColumnSelected(columnName) {
	var isColumnSelected = false;
	var select_column_div = document.getElementById('select-column');
	for(var i = 0 ; i < select_column_div.children.length; i++ ){
		var childDiv = select_column_div.children[i];
		if(childDiv.type == 'checkbox' && childDiv.id == columnName && childDiv.checked) {
			isColumnSelected = true
			break;
		}
	}
	return isColumnSelected;
}

/*
25. Function to get all column names
*/ 
function getAllColumns() {
	let columnSet = new Set();
	var json = getParsedJson();
	for (var key in json[0]) {
		columnSet.add(key);
	}
	return columnSet;
}

/*
26. Function to get all numerical columns
*/
function getAllNumericalColumns() {
	var numericalFilterColumnsSet = new Set();
	var allColumns = getAllColumns();
	var categorisedColumnsSet = getAllCategorisedColumnSet();
	for (const value of allColumns) {	
		if(!categorisedColumnsSet.has(value)){
			numericalFilterColumnsSet.add(value);
		}
	}
	return numericalFilterColumnsSet;
}

/*
27. Function to convert string to a camel case
*/
function convertToCamelCase(string,seperator){
    var out = "";
	if(seperator != null){
    string.split(seperator).forEach(function (el, idx) {
        var add = el.toLowerCase();
        out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
    });
	}else {
		return string;
	}	
    return out;
}

/*
28. Function to get all filtered conditions
*/
function getAllFilteredConditions() {
	let filteredItem = [];
	let selectedCatColumnValueMap = new Map();
	let selectedNumColumnValueMap = new Map();
	let numericalCheckBox = new Set();
	var filter = document.getElementById('categorical-filter-checkbox');
	for(var i = 0; i < filter.children.length ; i++){
		var childElement = filter.children[i].firstElementChild.childNodes;
		var columnName = convertToCamelCase(childElement[0].data," ");
		var multiSelectDropDowns = childElement[2].options;
		let selectedCatValueSet = new Set();
		for(var j = 0 ; j< multiSelectDropDowns.length; j++){
			if(multiSelectDropDowns[j].selected){
				selectedCatValueSet.add(multiSelectDropDowns[j].value);
			}
		}
		if(selectedCatValueSet.size > 0){
			selectedCatColumnValueMap.set(columnName,selectedCatValueSet);
		}	
	}
	filteredItem.push(selectedCatColumnValueMap);
	var numericalFilters = getAllNumericalColumns();
	for (const value of numericalFilters) {
		if(isColumnSelected(value)){
			numericalCheckBox.add(convertToCamelCase(value," "));
		}
	}
	if(numericalCheckBox.size > 0){
		selectedNumColumnValueMap.set('selectedNumericalValues',numericalCheckBox);
		selectedNumColumnValueMap.set('numericalFilterCondition',document.querySelector('input[name="numericalFilter"]:checked').value);
		selectedNumColumnValueMap.set('numericalFilterValue',document.getElementById('numericalFilter').value);
	}
	filteredItem.push(selectedNumColumnValueMap);
	return filteredItem;
}

/*
29. Function to reset the canvas element.
*/
function cleanUpSpace(){
	var bc = document.getElementById('barchartcanvas');
	var lc = document.getElementById('linechartcanvas');
	var pc = document.getElementById('piechartcanvas');
	var sc = document.getElementById('stackedchartcanvas');
	var pic = document.getElementById('pivotchartcanvas');
	if(bc != undefined){
		bc.remove();
	}
	if(lc != undefined){
		lc.remove();
	}
	if(pc != undefined){
		pc.remove();
	}
	if(sc != undefined){
		sc.remove();
	}
	if(pic != undefined){
		pic.remove();
	}
}

/*
30. Function to create a canvas chart element and append to the parent div.
*/
function createCanvasElement(chartType){
	var canvas = document.createElement('canvas');
	canvas.id=chartType;
	canvas.class="chartCanvas";
	document.getElementById('childChart').appendChild(canvas);
}

/*
31. Function to apply the chart selection and draw them
*/ 
function applyChart() {
	cleanUpSpace();
	var filteredConditiontionsMap = getAllFilteredConditions();
	var map = preProcessFilter(filteredConditiontionsMap);
	var chartsSelected = getChartSelections();
	var labels = [];
	var vals = [];
	for (let label of map.keys()){
		labels.push(label);
		vals.push(map.get(label));
	}
	for(var i =0;i<chartsSelected.length;i++){
		document.getElementById('parentChart').style.display = "block";
		let cs = new ChartStore();
		var chart = null;
		let isBackgroundColorRequired = true;
		if(chartsSelected[i] == "Bar Chart"){
			createCanvasElement("barchartcanvas");
			let barChartDecorator = new BarChartDecorator();
			chart = cs.orderChart("bar");
			chart.setLabelAndData(labels,vals);
			barChartDecorator.applyBackgroundColor(chart);
			barChartDecorator.applyBorderColor(chart);
		} 
		else if(chartsSelected[i] == "Line Chart"){
			let lineChartDecorator = new LineChartDecorator();
			createCanvasElement("linechartcanvas");
			chart = cs.orderChart("line");
			chart.setLabelAndData(labels,vals);
			lineChartDecorator.applyBorderColor(chart);
		} 
		else if(chartsSelected[i] == "Pie Chart"){
			let pieChartDecorator = new PieChartDecorator();
			createCanvasElement("piechartcanvas");
			chart = cs.orderChart("pie");
			chart.setLabelAndData(labels,vals); 
			pieChartDecorator.applyBackgroundColor(chart);
			pieChartDecorator.applyBorderColor(chart);
		} 
		else if(chartsSelected[i] == "Stacked Chart"){
			createCanvasElement("stackedchartcanvas");
			var stackedChartCanvasEl = document.getElementById('stackedchartcanvas');
			var brEl = document.createElement('br');
			document.getElementById('childChart').insertBefore(brEl,stackedChartCanvasEl);
			let stackedChart = new StackedChart();
			stackedChart.plot(labels,vals);			
		} 
		else if(chartsSelected[i] == "Pivot Chart"){
			createCanvasElement("pivotchartcanvas");
			let pivotChart = new PivotChart();
			pivotChart.plot(labels,vals);
		}
		chart.plot();
	}
}

/*
32. Function to apply preprocessed filters
*/
function preProcessFilter(filterCondition) {
	let isCategorical = 0;
	let isNumerical = 0;
	let columnName;
	let categoryValues;
	let columnValue;
	let operand;
	let colNames = [];
	let resultDataMap = new Map();
	for (let categoryKey of filterCondition[0].keys()){
		isCategorical = 1;
		isNumerical = 0;
		columnName = categoryKey;
		categoryValues = filterCondition[0].get(categoryKey);
		for(let columnVal of categoryValues){
			let count = filterData(columnName, columnVal, isCategorical, isNumerical);
			resultDataMap.set(columnVal, count);
		}
	}
	for(let numericalKey of filterCondition[1].keys())
	{
		isNumerical = 1;
		isCategorical = 0;		
		if(numericalKey == "selectedNumericalValues"){
			let numericalVals = filterCondition[1].get(numericalKey);
			
			for(let val of numericalVals.keys())
			{
				colNames.push(val);
			}
		}
		else if(numericalKey == "numericalFilterCondition")
		{
			let operandName = filterCondition[1].get(numericalKey);
			if(operandName == "greaterThanEqualTo"){
				operand = ">=";
			}
			else if(operandName == "lessThanEqualTo"){
				operand = "<=";
			}
			else if(operandName == "equalTo"){
				operand = "=";
			}
		}
		else if(numericalKey == "numericalFilterValue"){
			columnValue = filterCondition[1].get(numericalKey);
		}	
	}
	if(isNumerical){
		for(let col of colNames)
		{
			let count = filterData(col,columnValue, isCategorical, isNumerical, operand);
			resultDataMap.set(col, count);
		}
	}
	return resultDataMap;
}

/*
33. Function to get all the selected chart types
*/
function getChartSelections(){
	var chartsSelected = [];
	var select_column_div = document.getElementById('select-column');
	var parentEl = document.getElementById('plot-graph').children[0];
	for(var i = 0;i<parentEl.children.length;i++){
		var childEl = parentEl.children[i];
		if(childEl.type == 'checkbox' && childEl.checked){
			chartsSelected.push(childEl.value);
		}
	}
	return chartsSelected;
}

/*
34. Function to create the filters and apply them on dataset selected
*/
function filterData(columnName,columnValue,isCategorical, isNumerical, operand = '=') {
	let filterdata = new Filter();
	let result = filterdata.filterRow(objArr, columnName, columnValue, operand, isCategorical, isNumerical);
	return result;
}

/*
35. Class to create the new filter
*/
class Filter{
	constructor(){}
	filterRow(dataSet, columnName, columnValue, operand, isCategorical, isNumerical){
		let result;
		if(isCategorical){
			result = dataSet.filter(fil => fil[columnName] === columnValue );		
		}

		if(isNumerical){
			if(operand == '='){
				result = dataSet.filter(fil => fil[columnName] === Number.parseInt(columnValue) );
			}
			else if(operand == '>='){
				result = dataSet.filter(fil => fil[columnName] >= Number.parseInt(columnValue) );
			}
			else{
				result = dataSet.filter(fil => fil[columnName] <= Number.parseInt(columnValue) );
			}
		}
		return result.length;
    }
}

/*
36. Function to export the newly filtered dataset
*/
function exportDataset() { 
	var filteredConditiontionsMap = getAllFilteredConditions();
	var map = preProcessFilter(filteredConditiontionsMap);	
	if(document.getElementById("jsonFormat").checked)
		saveJSON(map, "dataset.json"); 
	if(document.getElementById("csvFormat").checked){
		var objArrayy = JSON.stringify(map);
		saveCSV(objArrayy);
	}
}

/*
37. Function to export the filtered data in JSON format
*/
function saveJSON(data, filename){
    if(!data) {
        console.error('No data');
        return;
    }
    if(!filename) filename = 'console.json';
    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4);
    }
    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}

/*
38. Function to export the filtered data in CSV format
*/
function saveCSV(objArrayy) {
	var array = typeof objArrayy != 'object' ? JSON.parse(objArrayy) : objArrayy;
	var str = '';
	for (var i = 0; i < array.length; i++) {
		var line = '';
		for (var index in array[i]) {
		  if(line != '') line += ','
		 
		  line += array[i][index];
		}
		str += line + '\r\n';
	}
	var exportFilename = "Dataset.csv";
	if (navigator.appName != 'Microsoft Internet Explorer') {
		var csvData = new Blob([array], {type: 'text/csv;charset=utf-8;'});
		if (navigator.msSaveBlob) {
			navigator.msSaveBlob(csvData, exportFilename);
		} else {
			var link = document.createElement('a');
			link.href = window.URL.createObjectURL(csvData);
			link.setAttribute('download', exportFilename);
			document.body.appendChild(link);    
			link.click();
			document.body.removeChild(link);    
		}
	} else {
		var popup = window.open('','csv','');
		popup.document.body.innerHTML = '<pre>' + str + '</pre>';
	}     
}