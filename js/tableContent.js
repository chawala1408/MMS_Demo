$(function () {
    $("#example1").DataTable({
        "dom": '<"top"B>rt<"bottom"flip>',
        "pageLength" : 100,
        "responsive": true, 
        "autoWidth": false,
        "searching": false,
        "buttons": [{ extend: 'csv',
                        title: 'LeakDataExport',
                        text: 'Save to CSV' }],
        "bDestroy": true
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
});