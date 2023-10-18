// Separate Javascript File zur besseren Übersichtlichkeit erstellt


// **Tabelle sortieren:**
var sortDirection = 1;

// Funktion "SortTable" wird aufgerufen, wenn man eine Spalte sortieren möchte. 
// Parameter, columnIndex gibt an welche Spalte sortiert werden soll
function sortTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable"); 
    switching = true; 
  
    //While Schleife führt Tabellensortierung durch
    while (switching) { 
      switching = false;
      rows = table.rows; 
  
      // For-Schleife durchläuft alle Zeilen der Tabelle, vergleicht die Werte und prüft ob umgeschaltet werden muss
      for (i = 1; i < rows.length - 1; i++) { 
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[columnIndex]; // Wert der aktuellen Zeile in der ausgewählten Spalte wird in Variable x gespeichert
        y = rows[i + 1].getElementsByTagName("td")[columnIndex]; // Wert der nächsten Zeile in der ausgewählten Spalte wird in Variable y gespeichert
  
        // Werte in den Zielen werden in Kleinbuchstaben gespeichert und miteinander verglichen
        if (x && y) {
            var xValue = x.textContent.toLowerCase();
            var yValue = y.textContent.toLowerCase();


            // Prüfen ob Werte in umgekehrter Reihenfolge sortiert sind und umgeschaltet werden müssen 
            if (sortDirection === 1 && xValue > yValue) {
                shouldSwitch = true;
                break;
            } else if (sortDirection === -1 && xValue < yValue) {
                shouldSwitch = true;
                break;
            }
        }
      }

      //Wenn true ist, wird Reihenfolge in den Zeilen der Tabellen geändert, indem Zeilen umsortiert werden
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }

    }

    //Ändern der Sortierrichtung für nächsten Durchlauf
    sortDirection *= -1;
  }


// "onclick" Funktion der Buttons einbinden
document.getElementById("button1").onclick = function() {
    sortTable(0); //Spalte 1 (0)
};

document.getElementById("button2").onclick = function() {
    sortTable(1); //Spalte 2 (1)
};

document.getElementById("button3").onclick = function() {
    sortTable(2); //Spalte 3 (2)
};








// **Tabelle filtern:**
var filterYear = document.getElementById('filter1');
var filterCategory = document.getElementById('filter2');

var table = document.getElementById('myTable');
var rows = table.getElementsByTagName('tr');


// Filterfunktion um die Spalte Unternehmen und Länder zu sortieren
filterCategory.addEventListener('change', function() {  // Funktion für das Drop-down Menü
    var pickCategory = filterCategory.value;

    for (var i = 1; i < rows.length; i++) {  // i=1 Werte im "thead" sollen nicht geprüft werden, sondern nur tbody
        var row = rows[i];
        var companies = row.getElementsByClassName('companies')[0]; // sortiert Elemente der Unternehmen aus und speichert sie in der Variable companies
        var countries = row.getElementsByClassName('countries')[0]; // sortiert Elemente der Länder aus und speichert sie in der Variable countries
    
        // prüft ob ausgewählte Kategorie "all" ist, oder ein Unternehmen oder ein Land ist
        if (pickCategory === 'all2' || pickCategory === 'companies' && companies || pickCategory === 'countries' && countries) {
        row.style.display = ''; // wird abhängig von der if-Bedingung eingeblendet
        } else {
        row.style.display = 'none'; // oder ausgeblendet
        }
    }
});

// Filterfunktion für Spalte "Year" um nach Jahren zu sortieren:
filterYear.addEventListener('change', function() { 
    var pickYear = filterYear.value.toLowerCase();

    for (var i = 1; i < rows.length; i++) { 
        var row = rows[i];
        var year = row.getElementsByTagName('td')[0].textContent.toLowerCase();

        if (pickYear === 'all1' || year === pickYear) {
        row.style.display = ''; 
        } else {
        row.style.display = 'none'; 
        }
    }
});






// **Eingabefelder gegen XSS Attacken absichern:**
// 1. Escape-Funktion, um Benutzereingaben sicher anzuzeigen
function escapeHTML(input) {
    const searchInput = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };
    return input.replace(/[&<>"']/g, match => searchInput[match]);
}

// 2. Validierung und Escapen von Benutzereingaben
function validateSearch() {
    const searchInput = document.getElementById('searchInput').value;
    const sanitizedInput = escapeHTML(searchInput);

    if (searchInput !== sanitizedInput) {

        document.getElementById('errorText').textContent = 'Invalid! Please do not use special characters.';
        return false; // Suche wird nicht abgeschickt

    } else {
        
        // Suche wird abgeschickt, Eingabe ist sicher
        return true;
    }
}




