window.addEventListener("message", function(event) {
    var v = event.data    
    switch (v.action) {
        case 'openReportMenu': 
            setInterval(function() {
                var date = new Date;
                var minute = date.getMinutes()
                var hour = date.getHours()
                var year = date.getFullYear();
                var month = date.getMonth(); // beware: January = 0; February = 1, etc.
                var day = date.getDate();
                $('.feCha span').text(` ${day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}.${(month+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}.${year} ${hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`)
            }, 1000);
             $('.NameInTop span').text(`${v.username}`)
             $('.container').fadeIn(500)
        break;

        case 'updateCoords':
            $('#locacionPlayer').val(v.coordenadas)
            $('#locacionBugs').val(v.coordenadas)
            $('#locacionOther').val(v.coordenadas)
        break;

        case 'adminPanel': 
            var putita 
            $('.ListReportPe').fadeIn(500)
            if (v.checkjs == 1) {
                putita = '<i class="fas fa-check" style="color:green; text-shadow: 0vw 0vw 0.8vw green"></i>'
            } else if(v.checkjs == 0) {
                putita = '<i class="fas fa-times" style="color:red; text-shadow: 0vw 0vw 0.8vw red"></i>'
            }
            $('tbody').append(`
                <tr class="borrarReportesXd" id="${v.reportid}">
                    <td class="titulojs">${v.titulojs}</td>
                    <td class="namejs">${v.namejs}</td>
                    <td class="typejs">${v.typejs}</td>
                    <td class="checkjs">${putita}</td>
                    <td class="datejs">${v.datejs}</td>
                </tr>
            `)

            $(`#${v.reportid}`).click(function(){
                $('.willbePid').attr('id', this.id)
                $.post('https://Roda_ReportSystemV2/RequestReport', JSON.stringify({
                    reportid : this.id
                }));
                
            })
        break;

        case 'UpdateReport': 

            $('.titulo').text(v.typejs)
            $('.NameUser').text(v.namejs)
            $('#TitleText-3').val(v.titulojs)
            $('#DescriptionText-3').val(v.descriptionjs)
            $('#pidjs').val(v.playerjs)
            $('#DescriptionText-3').attr('readonly', 'readonly')
            $('#TitleText-3').attr('readonly', 'readonly')
            $('.fotoBox').css({'background-image':`url(${v.picturejs})`})
            $('#locacionPlayer').val(v.coordsjs)
            $('.sendReport').hide()
            $('#SolveProblem').show()
            $('.fa-image').hide()
            OpenReportMenu()
        break;


        case 'showNoti': 
            ShowNoti(v.tituloxD, v.cuerpoxD, v.color)
        break;
    }
});

$(document).keyup((e) => {
    if (e.key === "Escape") {
        CloseAll()
    }
});


$(function(){


    $('#SearchReport').keyup(function(){
        // Search Text
        var search = $(this).val();
    
        // Hide all table tbody rows
        $('table tbody tr').hide();
    
        // Count total search result
        var len = $('table tbody tr:not(.notfound) td:contains("'+search+'")').length;
    
        if(len > 0){
          // Searching text in columns and show match row
          $('table tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
            $(this).closest('tr').show();
          });
        }
    
    });

    $('.closeMenu').click(function(){
        CloseAll()
    })
    $('.BugReport').click(function(){
        OpenBugReport()
        $('.titulo').text('Bug Report')
    })

    $('.Other').click(function(){
        OpenOtherReport()
        $('.titulo').text('Other Report')
       
    })

    $('#SolveProblem').click(function(){
        $.post('https://Roda_ReportSystemV2/UpdateReport', JSON.stringify({
            reportidxd : $('.willbePid').attr('id')
        }));
        CloseAll()
    })

    $('.PlayerReportClick').click(function(){
        OpenPlayerReport()
        $('.titulo').text('Player Report')
    })


    $('.GetCoords').click(function(){
        $.post('https://Roda_ReportSystemV2/GetCoords', JSON.stringify({}));
    })

    $('.fa-image').click(function(){
        $('.fa-image').hide()
        $('.inputImage').fadeIn(500)

    })

    $('.sendReport').click(function(){
        var date = new Date;
        var minute = date.getMinutes()
        var hour = date.getHours()
        var year = date.getFullYear();
        var month = date.getMonth(); // beware: January = 0; February = 1, etc.
        var day = date.getDate();
        fecha = `${day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}.${(month+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}.${year}`
        titulo = $('#TitleText-1').val() || $('#TitleText-2').val() || $('#TitleText-3').val()
        descripcion = $('#DescriptionText-1').val() || $('#DescriptionText-2').val() || $('#DescriptionText-3').val() 
        username = $('.NameUser').text()
        picture = $('#imagenPapi-player').val() || $('#imagenPapi-other').val() || $('#imagenPapi-bug').val()
        coords = $('#locacionBugs').val() || $('#locacionOther').val() || $('#locacionPlayer').val()
        type = $('.titulo').text()
        pidreportes = $('#pidjs').val() 
        $.post('https://Roda_ReportSystemV2/SendData', JSON.stringify({
            titulo : titulo || 'NO TITLE',
            descripcion : descripcion || 'NO DESCRIPTION',
            username : username, 
            fecha : fecha, 
            picture : picture || 'https://media.discordapp.net/attachments/946896143621705799/957728209540100127/ezgif.com-gif-maker_7.png',
            coords : coords,
            type : type || 'Default',
            targetid : pidreportes || 0
        }));
        CloseAll()
    })
})

function CloseAll(){
    $.post('https://Roda_ReportSystemV2/exit', JSON.stringify({}));
    $('.borrarTodoxD').show()
    $('.ReportBugPage').hide()
    $('.OtherReport').hide()
    $('.PlayerReport').hide()
    $('.fa-image').show()
    $('.inputImage').hide()
    $('.ListReportPe').hide()
    $('.borrarReportesXd').remove()
    $(':input').val('')
    $('#DescriptionText-3').removeAttr('readonly')
    $('#TitleText-3').removeAttr('readonly')
    $('.fotoBox').css({'background-image':`none`})
    $('.fa-image').show()
    $('.titulo').text('RODA REPORT SYSTEM')
    $('.container').fadeOut(500)
    $('.sendReport').show()
    $('#SolveProblem').hide()
}

function OpenBugReport(){
    $('.borrarTodoxD').hide()
    $('.ReportBugPage').show()
}

function OpenReportMenu(){
    $('.borrarTodoxD').hide()
    $('.ListReportPe').hide()
    $('.container').show()
    $('.PlayerReport').show()
}

function OpenOtherReport(){
    $('.borrarTodoxD').hide()
    $('.OtherReport').show()
}

function OpenPlayerReport(){
    $('.borrarTodoxD').hide()
    $('.PlayerReport').show()

}

function OpenPrincipalMenu() {
    $('.borrarTodoxD').show()
}

function ShowNoti(title, cuerpo, color) {

    var id = $(`.NotisDaddy .notis`).length;
    $('.NotisDaddy').animate({'right':'1vw'})
    $('.NotisDaddy').show()
    $('.NotisDaddy').append(`
    <div id=${id} class="notis"> 
        <svg class="car-izaba" style="color: red;" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100.43 20">    
            <path id="can-path22"  fill-opacity="0" stroke-width="2"stroke-linecap="round" stroke="${color}" d="M2.525,29.843V11.28S3.38,2.5,12.21,2.5H29.906"/>
        </svg>
            <h1>${title}</h1>
            <p>${cuerpo}</p>
        <svg class="car-supde" style="color: aliceblue;" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100.43 20">        
            <path id="hunger-path22"  fill-opacity="0" stroke-width="2"stroke-linecap="round" stroke="${color}" d="M2.525,29.843V11.28S3.38,2.5,12.21,2.5H29.906"/>
        </svg>
    </div>
    `)
    
    setTimeout(function () {
        var $this = $(`.NotisDaddy .notis[id=${id}]`);

        $this.fadeOut(400)
    }, 3000)
}