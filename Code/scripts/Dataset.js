class Dataset{
	constructor(){
		this.dataFrame = dfjs.DataFrame;
	}
	
	getDataFrame(){
		return this.dataFrame;
	}
	
	import_data(){
		var vals = document.getElementById("datasets");
		currentDataSet = vals.options[vals.selectedIndex].value;
		this.dataFrame.fromCSV(currentDataSet).then(df => 
		{
			var data = df.toJSON('SAT.json');        
			export_data(data);
		});
	}


	export_data(dataset){
		var blob= new Blob([data],{ type:"text/ApplicationJson;charset:utf-8" });
		dataframeSet = dataset;
		createTableFromJSON();
	}
}