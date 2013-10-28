// Global namespace

var FRISBEE = FRISBEE || {};

(function () {

	// Waarom al deze objecten als je er niks mee doet.
	// Data objecten
	
	// Controller Init, start na de DOM Ready
	FRISBEE.controller = {
		init: function () {
			// Initialize router
			FRISBEE.router.init();
		}
	};

	// Router, voorziet je van #-routes "singlepage"
	FRISBEE.router = {
		init: function () {
  		routie({
			    '/schedule': function() {
			    	FRISBEE.page.schedule();
				},
			    '/game': function() {
			    	FRISBEE.page.game();
			    },

			    '/ranking': function() {
			    	FRISBEE.page.ranking();
			    },
			    '*': function() {
			    	FRISBEE.page.schedule();
			    }
			});
		},

		change: function () {
            var route = window.location.hash.slice(2),
                sections = qwery('section[data-route]'),
                section = qwery('[data-route=' + route + ']')[0];  

            // Laat de actieve section zien en de rest niet
            if (section) {
            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route
            if (!route) {
            	sections[0].classList.add('active');
            }

		}
	};

	// Pages
	FRISBEE.page = {
		schedule: function () {
			$$.json('https://api.leaguevine.com/v1/game_scores/?tournament_id=19389&access_token=395d9028d3',{}, function(data){
			FRISBEE.schedule.games = data;
			Transparency.render(qwery('[data-route=schedule.games')[0], FRISBEE.schedule.games);
			//console.log(data);
			FRISBEE.router.change();
		     })
		},

		game: function () {
			Transparency.render(qwery('[data-route=game')[0], FRISBEE.game);
			FRISBEE.router.change();
		},

		ranking: function () {
			$$.json('https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=6df342fc83',{}, function(data){
			FRISBEE.ranking.pools = data;
			Transparency.render(qwery('[data-route=ranking.pools')[0], FRISBEE.ranking.pools);
			//console.log(FRISBEE.Ranking.pools);
			FRISBEE.router.change();
		})
		}
	}
	// DOM ready - Start de applicatie, pas als de pagina is geladen
	domready(function () {
		FRISBEE.controller.init();
	});
	
})();
