* /crear un Módulo JavaScript */
var apiRest = apimock;
/*var apiRest = apiclient;*/

var app = (function () {

    var getBlueprintsByAuthor = function (author) {
        return apiRest.getBlueprintsByAuthor(author, function (err, data) {
            if (author==null) {
                return new Error("Error al consultar los blueprints:" + err)
            }
			alert(data);
            console.log("lista: " + apimock.getBlueprintsByAuthor);
            console.log("data: " + data);
            /*console.log("data: " + data[0].name);
            console.log("data: " + data[1].name);*/
            console.log("author: " + author);

            $('#tablaAuthor').html(author + "'s blueprints");
            var table = $('#bluePrints')
            table.empty();
            table.append(`
          <thead>
              <tr>
                  <th>Blueprint name</th>
                  <th>Number of points</th>
                  <th>Open</th>
              </tr>
          </thead>
          `)
            var totalPoints = 0;
            for (var i = 0; i < data.length; i++) {
                table.append(`
              <tr>
                  <td>` + data[i].name + `</td>
                  <td>` + data[i].points.length + `</td>
                  <td>
                      <button type="button" class="btn btn-info" onclick="app.getBlueprintsByNameAndAuthor('` + data[i].name + `','` + data[i].author + `')" >Open</button>
                  </td>
              </tr>
              `)
                totalPoints = totalPoints + data[i].points.length;
            }
            table.append('</tbody>');
            $('#puntosTotales').html('Total user points: ' + totalPoints);
        });
    }

    var getBlueprintsByNameAndAuthor = function (author, name) {
        return apimock.getBlueprintsByNameAndAuthor(author, name, function (err, data) {
            if (err) {
                return new Error("Error al consultar los blueprints:" + err)
            }
            $('#nameBlueprint').html("Current blueprint: " + author);
            var canvas = $('#panelCanvas');
            var ctx = canvas[0].getContext("2d");
            ctx.beginPath();
            ctx.moveTo(data.points[0].x, data.points[0].y);
            data.points.forEach(function (point) {
                ctx.lineTo(point.x, point.y);
            })
            ctx.stroke();
        })
    }

    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
    }

})();