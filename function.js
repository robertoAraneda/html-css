const SUPABASE_URL = 'https://ajqlopiiejntabesnibe.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzcyNjQ5MywiZXhwIjoxOTU5MzAyNDkzfQ.IUb0KRdX6F-sZ1PC5CkUV4Sw0JgZwDzXGoT79EkF4EY';

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', function (event) {
  const tbodyRef = document.getElementById('result-list');

  supabase
    .from('resultados_pcr')
    .select('*')
    .then(({ data }) => {
      data.forEach((element, index) => {
        const newRow = tbodyRef.insertRow(index);

        const cellId = newRow.insertCell(0);
        const cellName = newRow.insertCell(1);
        const cellTypeCrewMember = newRow.insertCell(2);
        const cellSpecimenAt = newRow.insertCell(3);
        const cellResult = newRow.insertCell(4);
        const cellCreatedAt = newRow.insertCell(5);
        const cellButton = newRow.insertCell(6);
        console.log(newRow);

        cellId.innerHTML = index + 1;
        cellName.innerHTML = element.name;
        cellTypeCrewMember.innerHTML = element.type_crew_member;
        cellSpecimenAt.innerHTML = transformDateTable(element.specimen_at);
        cellResult.innerHTML = element.result;
        cellCreatedAt.innerHTML = transformDateTimeTable(element.created_at);
        cellButton.innerHTML = `<button id="edit" onclick="editRow('${element.id}')">Editar</button>
		<button id="delete" onclick="deleteRow('${element.id}')">Eliminar</button>`;
      });
    })
    .catch((err) => {
      alert(err);
    });
});

function editRow(id) {
  supabase
    .from('resultados_pcr')
    .select('*')

    // Filters
    .eq('id', id)
    .then(({ data }) => {
      [data] = data;

      const id = (document.getElementById('id').value = data.id);
      const run = (document.getElementById('run').value = data.run);
      const name = (document.getElementById('name').value = data.name);
      const typeCrewMember = (document.getElementById(
        'type-crew-member'
      ).value = data.type_crew_member);
      const specimenAt = (document.getElementById('specimen-at').value =
        transformDate(data.specimen_at));
      const result = (document.getElementById('result').value = data.result);
    })
    .catch((err) => {
      alert(err);
    });
}

function deleteRow(id) {
  supabase
    .from('resultados_pcr')
    .delete()
    .eq('id', id)
    .then(({ data }) => {
      location.reload();
    })
    .catch((err) => {
      alert(err);
    });
}

function addRow(event) {
  event.preventDefault();

  const run = document.getElementById('run').value;
  const name = document.getElementById('name').value;
  const typeCrewMember = document.getElementById('type-crew-member').value;
  const specimenAt = document.getElementById('specimen-at').value;
  const result = document.getElementById('result').value;

  const id = document.getElementById('id').value;
  if (id) {
    supabase
      .from('resultados_pcr')
      .update({
        run: run,
        name: name,
        type_crew_member: typeCrewMember,
        result: result,
        specimen_at: specimenAt,
      })
      .eq('id', id)
      .then((response) => {
        location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    supabase
      .from('resultados_pcr')
      .insert([
        {
          run: run,
          name: name,
          type_crew_member: typeCrewMember,
          result: result,
          specimen_at: specimenAt,
        },
      ])
      .then((response) => {
        location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }
}

function transformDateTimeTable(value) {
  const date = new Date(value);

  const day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
  const month =
    date.getMonth() + 1 > 10
      ? date.getMonth() + 1
      : '0' + (date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
  const minutes =
    date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
  const seconds =
    date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds();

  return (
    day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds
  );
}

function transformDateTable(value) {
  const date = new Date(value);

  const day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
  const month =
    date.getMonth() + 1 > 10
      ? date.getMonth() + 1
      : '0' + (date.getMonth() + 1);
  const year = date.getFullYear();

  return day + '/' + month + '/' + year;
}

function transformDate(value) {
  const [date, time] = value.split('T');

  return date;
}
