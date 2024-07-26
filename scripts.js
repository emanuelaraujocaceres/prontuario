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
            const id = Date.now(); // Gera um ID único baseado no timestamp

            const patient = { id, name, age, gender, medicalHistory };

            let patients = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : [];
            patients.push(patient);
            localStorage.setItem('patients', JSON.stringify(patients));

            alert('Paciente cadastrado com sucesso!');
            form.reset();
            displayPatients(); // Atualiza a lista de pacientes após adicionar um novo
        });
    }

    if (patientList) {
        displayPatients(); // Exibe a lista de pacientes ao carregar a página
    }

    function displayPatients() {
        let patients = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : [];
        patientList.innerHTML = '';
        patients.forEach(patient => {
            const li = document.createElement('li');
            li.innerHTML = `
                Prontuário: ${patient.id}, Nome: ${patient.name}, Idade: ${patient.age}, Gênero: ${patient.gender}, Histórico Médico: ${patient.medicalHistory}
                <button onclick="editPatient(${patient.id})">Editar</button>
                <button onclick="confirmDelete(${patient.id})">Excluir</button>
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
                    <button onclick="confirmDelete(${patient.id})">Excluir</button>
                `;
                patientList.appendChild(li);
            }
        });
    }

});
