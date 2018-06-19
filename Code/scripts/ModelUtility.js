class DiversityIndexObject
{
	constructor(location,diversityIndex,africanAmericans,americanIndian,asianNative,hawaiian,twoOrMoreRaces,hispanicOrLatino,white)
	{
		this.location = location;
		this.diversityIndex = diversityIndex;
		this.africanAmericans = africanAmericans;
		this.americanIndian = americanIndian;
		this.asianNative = asianNative;
		this.hawaiian = hawaiian;
		this.twoOrMoreRaces = twoOrMoreRaces;
		this.hispanicOrLatino = hispanicOrLatino;
		this.white = white;
	}
}

class IncomeOccupationObject{
	constructor(occupation,all_workers,all_weekly,m_workers,m_weekly,f_workers,f_weekly)
	{
		this.occupation = occupation;
		this.all_workers = all_workers;
		this.all_weekly = all_weekly;
		this.m_workers = m_workers;
		this.m_weekly = m_weekly;
		this.f_workers = f_workers;
		this.f_weekly = f_weekly;
	}
}

class JobCategoryObject
{
	constructor(company,year,race,gender,job_category,count)
	{
		this.company = company;
		this.year = year;
		this.race = race;
		this.gender = gender;
		this.job_category = job_category;
		this.count = count;
	}
}

class PopulationByZipObject
{
	constructor(population,minimum_age,maximum_age,gender,zipcode,geo_id)
	{
		this.population = population;
		this.minimum_age = minimum_age;
		this.maximum_age = maximum_age;
		this.gender = gender;
		this.zipcode = zipcode;
		this.geo_id = geo_id;
	}
}