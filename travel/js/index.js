$(function () {

    const property = 'hc-key';

    const visited_countries = [
        'cn',
        'sg',
        'jp',
        'ca',
        'gb',
        'eg',
        'no',
        'se',
        'fi',
        'pt',
        'au',
        'nz',
        'us',
    ]

    function getDrilldown(data, visited) {
        $.each(data, function (i) {
            this.value = visited.indexOf(this.properties[property]);
        });
        return data;
    }

    // Fetch data
    const world_data = Highcharts.geojson(Highcharts.maps['custom/world']);

    const cn_data = Highcharts.geojson(Highcharts.maps['countries/cn/custom/cn-all-sar-taiwan']);

    const jp_data = Highcharts.geojson(Highcharts.maps['countries/jp/jp-all']);

    // North America
    const ca_data = Highcharts.geojson(Highcharts.maps['countries/ca/ca-all']);
    const us_data = Highcharts.geojson(Highcharts.maps['countries/us/us-all']);

    // Set drilldown pointers
    $.each(world_data, function (i) {

        if (this.properties[property] === 'cn') {
            this.drilldown = getDrilldown(
                cn_data,
                [
                    'cn-bj',
                    'cn-sh',
                    'cn-zj',
                    'cn-fj',
                    'cn-gd',
                    'cn-sa',
                    'cn-hu',
                    'cn-hn',
                    'cn-sd',
                    'cn-sc',
                    'cn-js',
                    'cn-sx',
                    'cn-he',
                    'cn-jx'
                ]);
            this.drilldownLabel = 'China';
        } else if (this.properties[property] === 'jp') {
            this.drilldown = getDrilldown(
                jp_data,
                [
                    'jp-tk',
                    'jp-ky',
                    'jp-os',
                ]);
            this.drilldownLabel = 'Japan';
        } else if (this.properties[property] === 'ca') {
            this.drilldown = getDrilldown(
                ca_data,
                [
                    'ca-on',
                    'ca-bc',
                    'ca-ab',
                ]);
            this.drilldownLabel = 'Canada';
        } else if (this.properties[property] === 'us') {
            this.drilldown = getDrilldown(
                us_data,
                [
                    'us-ny',
                    'us-tx',
                    'us-il',
                ]);
            this.drilldownLabel = 'United States of America';
        }

        this.value = visited_countries.indexOf(this.properties[property]);
    });

    // Instanciate the map
    $('#container').highcharts('Map', {
        chart: {
            spacingBottom: 20,
            events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {
                        var chart = this;
                        var data = e.point.drilldown;
                        var label = e.point.drilldownLabel;

                        chart.addSeriesAsDrilldown(e.point, {
                            name: label,
                            data: data,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            },
                            tooltip: {
                                headerFormat: '',
                                pointFormat: '{point.name}'
                            }
                        });
                    }
                    chart.setTitle(null, {text: label});
                },
                drillup: function () {
                    this.setTitle(null, {text: 'World'});
                }
            }
        },
        title: {
            text: '"This too shall pass"，功不唐捐！',
        },

        subtitle: {
            text: '珍惜机会，怀着感恩的心，于心安处诗意打量这缤纷世界',
        },

        mapNavigation: {
            enabled: true,
            enableMouseWheelZoom: false,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            dataClasses: [{
                from: -100,
                to: 0,
                color: '#E5F5E0',
                name: 'Pending'
            }, {
                from: 0,
                to: 100,
                color: '#31A354',
                name: 'Visited'
            }]
        },

        plotOptions: {
            map: {
                states: {
                    hover: {
                        color: '#EEDD66'
                    }
                }
            }
        },

        series: [{
            name: 'World',
            data: world_data,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.name}'
            }
        }],

        drilldown: {
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textShadow: '0 0 3px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        }
    });
});
