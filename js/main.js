(function ($) {
	"use strict";

	/*=============================================
		=    		 Preloader			      =
	=============================================*/
	function preloader() {
		$('#preloader').delay(0).fadeOut();
	};

	$(window).on('load', function () {
		preloader();
		aosAnimation();
		wowAnimation();
		drawChart();
	});


	/*=============================================
		=          Menu Bottom Line			      =
	=============================================*/
	function menu_bottom_line_active() {
		var off = $('#mobile-menu > ul > li.show').offset(),
			left = off.left,
			right = $(window).width() - left - $('#mobile-menu > ul > li.show').width() + $('#mobile-menu > ul > li.show').width();

		$('<style>.navbar-wrap > ul > li.show > a::after{width:' + right + 'px;}</style>').appendTo("head");
	}

	menu_bottom_line_active();

	window.addEventListener("resize", () => {
		menu_bottom_line_active();
	})

	// Menu bottom line
	function menu_bottom_line() {

		$("#mobile-menu > ul > li").mouseover(function () {

			if ($("#mobile-menu > ul > li").hasClass("active")) {
				$(this).removeClass('active');
			}

			$(this).addClass('active');

			var off = $('#mobile-menu > ul > li.active').offset(),
				left = off.left,
				right = $(window).width() - left - $('#mobile-menu > ul > li.active').width() + $('#mobile-menu > ul > li.active').width();

			$('<style>.navbar-wrap > ul > li.active > a::after,.navbar-wrap > ul > li:hover > a::after{width:' + right + 'px;}</style>').appendTo("head");
		});

		$("#mobile-menu > ul > li").mouseleave(function () {
			$(this).removeClass('active');
		});

	}

	menu_bottom_line();


	/*=============================================
		=    		Mobile Menu			      =
	=============================================*/
	$('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "992"
	});


	/*=============================================
		=     Menu sticky & Scroll to top      =
	=============================================*/
	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 245) {
			$("#sticky-header").removeClass("sticky-menu");
		} else {
			$("#sticky-header").addClass("sticky-menu");
		}
	});

	/*=============================================
		=    		 Aos Active  	         =
	=============================================*/
	function aosAnimation() {
		AOS.init({
			duration: 1000,
			mirror: true
		});
	}


	/*=============================================
		=    		 Scroll Up  	         =
	=============================================*/
	$.scrollUp({
		scrollName: 'scrollUp',
		topDistance: '300',
		topSpeed: 300,
		animation: 'fade',
		animationInSpeed: 200,
		animationOutSpeed: 200,
		scrollText: '<i class="fas fa-caret-up"></i>',
		activeOverlay: false,
	});


	/*=============================================
		=    		 Wow Active  	         =
	=============================================*/
	function wowAnimation() {
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true
		});
		wow.init();
	}


})(jQuery);

function drawChart() {
	am5.ready(function () {

		// Create root element
		// https://www.amcharts.com/docs/v5/getting-started/#Root_element
		var root = am5.Root.new("allocation");

		// Set themes
		// https://www.amcharts.com/docs/v5/concepts/themes/
		root.setThemes([
			am5themes_Animated.new(root)
		]);

		// Create chart
		// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
		var chart = root.container.children.push(
			am5percent.PieChart.new(root, {
				endAngle: 270
			})
		);

		// Create series
		// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
		var series = chart.series.push(
			am5percent.PieSeries.new(root, {
				valueField: "value",
				categoryField: "category",
				endAngle: 270,
				alignLabels: false
			})
		);

		series.get("colors").set("colors", [
			am5.color(0x85242d),
			am5.color(0x642428),
			am5.color(0xe1636a),
			am5.color(0xca4953),
			am5.color(0xbd3242),
			am5.color(0xab1730)
		]);

		series.states.create("hidden", {
			endAngle: -90
		});

		// Set data
		// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
		series.data.setAll([
			{
				category: "Liquidity",
				value: 6
			}, {
				category: "Marketing",
				value: 9
			}, {
				category: "Private Sale",
				value: 10
			}, {
				category: "Public Sale",
				value: 15
			}, {
				category: "Fantom Supply",
				value: 30
			},
			{
				category: "Reserve",
				value: 30
			}
		]);

		series.labels.template.setAll({
			fontSize: 12,
			text: "{category} \n {value}%",
			textType: "radial",
			inside: true,
			radius: 4,
			centerX: am5.percent(100),
			fill: am5.color(0xffffff)
		})

		series.appear(1000, 100);
	}); // end 
}