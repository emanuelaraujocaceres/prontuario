document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('patientForm');
    const patientList = document.getElementById('patientList');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const gender = document.getElementById('gender').value;
            const medicalHistory = document.getElementById('medicalHistory').value;
            const id = Date.now();

            const patient = { id, name, age, gender, medicalHistory };

            let patients = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : [];
            patients.push(patient);
            localStorage.setItem('patients', JSON.stringify(patients));

            alert('Paciente cadastrado com sucesso!');
            form.reset();
        });
    }

    if (patientList) {
        displayPatients();
    }

    function displayPatients() {
        let patients = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : [];
        patientList.innerHTML = '';
        patients.forEach(patient => {
            const li = document.createElement('li');
            li.innerHTML = `
                Prontuário: ${patient.id}, Nome: ${patient.name}, Idade: ${patient.age}, Gênero: ${patient.gender}, Histórico Médico: ${patient.medicalHistory}
                <button onclick="editPatient(${patient.id})">Editar</button>
                <button onclick="deletePatient(${patient.id})">Excluir</button>
            `;
            patientList.appendChild(li);
        });
    }

    window.searchPatient = function() {
        const query = document.getElementById('searchQuery').value.toLowerCase();
        let patients = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : [];
        patientList.innerHTML = '';
        patients.forEach(patient => {
            if (patient.name.toLowerCase().includes(query) || patient.id.toString().includes(query)) {
                const li = document.createElement('li');
                li.innerHTML = `
                    Prontuário: ${patient.id}, Nome: ${patient.name}, Idade: ${patient.age}, Gênero: ${patient.gender}, Histórico Médico: ${patient.medicalHistory}
                    <button onclick="editPatient(${patient.id})">Editar</button>
                    <button onclick="deletePatient(${patient.id})">Excluir</button>
                `;
                patientList.appendChild(li);
            }
        });
    }

    window.deletePatient = function(id) {
        let patients = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : [];
        patients = patients.filter(patient => patient.id !== id);
        localStorage.setItem('patients', JSON.stringify(patients));
        displayPatients();
    }

    window.editPatient = function(id) {
        let patients = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : [];
        const patient = patients.find(patient => patient.id === id);

        if (patient) {
            const name = prompt('Nome:', patient.name);
            const age = prompt('Idade:', patient.age);
            const gender = prompt('Gênero:', patient.gender);
            const medicalHistory = prompt('Histórico Médico:', patient.medicalHistory);

            patient.name = name || patient.name;
            patient.age = age || patient.age;
            patient.gender = gender || patient.gender;
            patient.medicalHistory = medicalHistory || patient.medicalHistory;

            localStorage.setItem('patients', JSON.stringify(patients));
            displayPatients();
        }
    }
});
