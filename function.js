const SUPABASE_URL = 'https://ajqlopiiejntabesnibe.supabase.co'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzcyNjQ5MywiZXhwIjoxOTU5MzAyNDkzfQ.IUb0KRdX6F-sZ1PC5CkUV4Sw0JgZwDzXGoT79EkF4EY";
var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

document.addEventListener('DOMContentLoaded', function (event) {


	const tbodyRef = document.getElementById('result-list')

	supabase
		.from('resultados_pcr')
		.select('*')
	.then(({data}) => {

		data.forEach(element => {

	
		const newRow = tbodyRef.insertRow(0);


		const cellId = newRow.insertCell(0);
		const cellName = newRow.insertCell(1);
		const cellTypeCrewMember = newRow.insertCell(2);
		const cellSpecimenAt = newRow.insertCell(3);
		const cellResult = newRow.insertCell(4);
		const cellCreatedAt = newRow.insertCell(5);


		cellId.innerHTML = element.id
		cellName.innerHTML = element.name
		cellTypeCrewMember.innerHTML = element.type_crew_member
		cellSpecimenAt.innerHTML = element.specimen_at
		cellResult.innerHTML = element.result
		cellCreatedAt.innerHTML = element.created_at
		})

	})
	.catch((err) => {
	  alert(err)
	})
})



function addRow(event){
	event.preventDefault();


	const run = document.getElementById('run').value
	const name = document.getElementById('name').value
	const typeCrewMember = document.getElementById('type-crew-member').value
	const specimenAt = document.getElementById('specimen-at').value
	const result = document.getElementById('result').value


	supabase
		.from('resultados_pcr')
		.insert([
    { 
    	'run': run, 
	    'name': name, 
	    'type_crew_member': typeCrewMember, 
	    'result': result, 
	    'specimen_at': specimenAt 
	},
  ])
	.then((response) => {
	 location.reload();
	})
	.catch((err) => {
	  alert(err)
	})

}