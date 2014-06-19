/*sidebars */
jQuery(document).ready(function(){
	jQuery(".option_sidebar ul li").not('li.nothover,li.content_sidebars').click(function(e){
		e.preventDefault();
		var current_block = jQuery(this).attr('id');
		var sidebar_container = jQuery(this).attr('data-sidebar_container');
		var great_sdb_hoz = false;
		var current_sidebars = [];
		$arr_sdb_hor = ['left_1', 'left_2', 'right_1', 'right_2']
		jQuery('#'+current_block).toggleClass('selected');
		$count_sdb_hor = jQuery('ul.horinzontal li.selected').length;
		jQuery.each($arr_sdb_hor, function(i, e){
			if($count_sdb_hor > 2 && current_block == e){
				alert('You can select up to 2 sides box');
				jQuery('#'+current_block).toggleClass('selected');
				great_sdb_hoz = true;
				return false;
			}
		})
		if(great_sdb_hoz == true){return};
		//alert('app lay');
		current_status = jQuery('#'+current_block).hasClass('selected')?'enabled':'disabled';
		jQuery('.option_sidebar ul li.selected').each(function(i, e){
			current_sidebars.push(jQuery(e).attr('id'));
		});
		
		if(current_status == 'enabled'){
			//jQuery(".option_sidebar ul li").unbind('click');
			jQuery('.unbind_click, .too_image_preloader').show();
			//jQuery("body").off("click", ".option_sidebar ul li");
			switch(current_block){
				case "Top_1":
					get_sidebars(current_block, sidebar_position('Top_2'), 'before');
				break;
				case "Top_2":
					get_sidebars(current_block, '.wrap_content_middle', 'before');
				break;
				case "left_1":
					get_sidebars(current_block, sidebar_position('left_2'), 'before');
				break;
				case "left_2":
					get_sidebars(current_block, '.main_content', 'before');
				break;
				case "right_1":
					get_sidebars(current_block, '.main_content', 'after');
				break;
				case "right_2":
					get_sidebars(current_block, sidebar_position('right_1'), 'before');
				break;
				case "Bottom_1":
					get_sidebars(current_block, '.wrap_content_middle', 'after');
				break;
				case "Bottom_2":
					get_sidebars(current_block, sidebar_position('Bottom_1'), 'after');
				break;
			}
		}else if(current_status == 'disabled'){
			jQuery('.'+sidebar_container+'[data-pos="'+current_block+'"]').remove();
			make_sizes_sdb();
		}
		
				
		//alert(current_sidebars);
		function make_sizes_sdb(){
			$sidebar_hor = jQuery('.sidebar_right, .sidebar_left').length;
			switch($sidebar_hor){
				case 0:
				jQuery($sidebar_hor);
				jQuery('.main_content').css('width', 960);
				break;
				case 1:
				jQuery($sidebar_hor);
				jQuery('.main_content').css('width', 640);
				jQuery('.sidebar_right, .sidebar_left').css('width', 300);
				break;
				case 2:
				jQuery($sidebar_hor);
				jQuery('.main_content').css('width', 480);
				jQuery('.sidebar_right, .sidebar_left').css('width', 220);
				break;
			}
			jQuery('.unbind_click, .too_image_preloader').hide();
			//alert(jQuery('#post_grid').val());
			(jQuery('#post_grid').val() == 'Grid')?jQuery('.opt_sizes_grid .grid_sizebox:checked').trigger('click'):'';
		}
		function sidebar_position($has_pos){			
			if(jQuery.inArray($has_pos, current_sidebars) == -1){
				//alert('.main_content');
				return '.main_content'
			}else{
				//alert( '.'+sidebar_container+'');
				return '.'+sidebar_container+'';
			};
		}	
		function get_sidebars(current_block, to_elemtent, to_side){
			jQuery.ajax({
				type: 'POST',
				data: {sidepos:current_block}
			}).done(function(data){
				//alert(data);
				switch(to_side){
					case 'after':
						jQuery(to_elemtent).after(data);
					break;
					case 'before':
						jQuery(to_elemtent).before(data);
					break;
				}
				make_sizes_sdb();
			})
		}
		
	});
});