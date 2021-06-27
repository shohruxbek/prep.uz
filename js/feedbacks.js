$(document).ready(function() {

	//////////////////////
	//Fixed in question //
	//////////////////////
	$(document).on('scroll', function(event) {
		let scroll_pos = $(this).scrollTop();
		let el_pos = $('#question').offset().top;
		let footer_pos = $('footer').offset().top;
		if (scroll_pos > el_pos) {
			$('.q_content').addClass('fixed');
		}
		console.log(footer_pos);
		console.log('scroll '+scroll_pos);
/*		if (scroll_pos + 700 > footer_pos) {
			$('.q_content').removeClass('fixed');

		}*/

	});


	/////////////////////
	// FeedBack Adding //
	/////////////////////

	let form = $('form');
	let form_btn_add = $('.add');
	let form_btn_edit = $('.edit');
	let question_id = $('input[name=question_id]').val();
	let textarea = $('textarea');

	/////////////////////
	// FeedBack Adding //
	/////////////////////
	form_btn_add.on('click', function(event) {
		let feedback = $('textarea').val();
		let formData = form.serializeArray();
		event.preventDefault();
		if (feedback.length >= 3) {
			$.ajax({
				url: '/feedbacks/add-feedback',
				type: 'POST',
				data: {formData,"_token": $('#token').val(), feedback,question_id},
				success:function (response) {
					location.reload(true);
				},
				error:function (xhr) {
					console.log(xhr);
				}
			});
		} else {
			textarea.addClass('err');
			textarea.val("Fikir kamida 3 ta belgidan tashkil topgan bolishi kerak");
			$('textarea').on('click', function(event) {
				textarea.val(' ');
			});
		}
	});

	/////////////////////
	// FeedBack Editing //
	/////////////////////

	form_btn_edit.on('click', function(event) {
		let feedback = $('textarea').val();
		let formData = form.serializeArray();
		event.preventDefault();
		if (feedback.length >= 3) {
			$.ajax({
				url: '/feedbacks/update-feedback',
				type: 'POST',
				data: {formData,"_token": $('#token').val(), feedback,question_id},
				success:function (response) {
					location.reload(true);
				},
				error:function (xhr) {
					console.log(xhr);
				}
			});
		} else {
			textarea.addClass('err');
			textarea.val("Fikir kamida 3 ta belgidan tashkil topgan bolishi kerak");
			$('textarea').on('click', function(event) {
				textarea.val(' ');
			});

		}
	});


	//////////////////////
	// FeedBack Getting //
	//////////////////////


	let tPage = 1;
	let action = 'inactive';
	function load_data(page) {
		let formData = form.serializeArray();
		$.ajax({
			url: '/feedbacks/get-feedback',
			type: 'post',
			data: {formData,"_token": $('#token').val(),tPage,question_id},
			success:function (response) {
				tPage++
				$('.feedbacks-content').append(response);
				setInterval(function () {
					
					$('.feedbacks-content').masonry({
						itemSelector: '.feedback',
						columnWidth: '.feedback'
					});
					$('.feedbacks-content').masonry('reloadItems');
				},10);

				if(response == ' '){
					action = 'active'
				} else {
					action = 'inactive'
				}
			}
		});
	}


	if (action == 'inactive') {
		action = 'active';
		load_data(tPage);
	}


	$(window).scroll(function (e) {
		if ( $(window).scrollTop() + $(window).height() > ($('.feedbacks').height() +  $('header').height() - 40) && action == 'inactive' ) {
			action = 'active';
			load_data();
		};
	});
	





});		

