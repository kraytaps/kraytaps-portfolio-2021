const currProject = $(".project");

currProject.on("mouseenter", () => {
	if (window.innerWidth > 1200) {
		$(".project:not(:hover)").addClass("unfocused");
	}
});

currProject.on("mouseleave", () => {
  $(".project:not(:hover)").removeClass("unfocused");
});

const project1 = $("#project-1");
const project2 = $("#project-2");
const project3 = $("#project-3");
const projectDescriptionText = $(".project-description p");
const projectDescriptionBg = $(".project-description-bg")
let lastHovered;

project1.on("mouseenter", () => {
	if (lastHovered !== project1) {
		projectDescriptionText.animate({ opacity: 0}, 100, function () {
			$(this)
				.text(
					`AIS is a leading custom robotics company that creates affordable autonomous robotic solutions to solve real industry problems. I worked with several teams during my time at AIS, one of them being the BigTop team, where I spearheaded the design and development of new native and mobile apps that allow robot operators to automate BigTops, robots that organize pots around. After handing the product off, I worked on the Cartpuller team, where I developed both native and web apps to track the progress of cart-pulling robots through various parameters within the software. 

					I briefly worked on two other teams, one of them being the AIS platform. I improved the layout, functionality, and user experience of the customer-company dashboard by eliminating unnecessary processes in order to access data faster, creating a more intelligible front-end. The other team I briefly worked on was for a UV-disinfectant robot for the COVID-19 pandemic, for which I helped develop a web-app.`
				)
				.animate({ opacity: 1 }, 100);
		});
		lastHovered = feature1;
	}
})
project2.on("mouseenter", () => {
	if (lastHovered !== project2) {
		projectDescriptionText.animate({ opacity: 0}, 100, function () {
			$(this)
				.text(
					`Vibevent is a UBC based startup that creates solutions within the event discovery, event hosting, and event consulting platform. We have previously focused extensively on event discovery and event hosting. As the lead designer and a full-stack developer, I helped direct the project in terms of both design and branding identity, as well as implementation. In order to solve the problems we were tackling, we created a progressive web-app that allows users to interact with events in the most convenient way possible. Our two solutions were a map where users could see events happening live and obtain the information they needed to make decisions, as well as a dashboard for events currently happening. During the COVID-19 pandemic, we integrated various video conferencing tools so that users can directly create events and open virtual rooms within the app.`
				)
				.animate({ opacity: 1 }, 100);
		});
		lastHovered = feature2;
	}
})
project3.on("mouseenter", () => {
	if (lastHovered !== project3) {
		projectDescriptionText.animate({ opacity: 0}, 100, function () {
			$(this)
				.text(
					`Aerogreens is Jakarta's first indoor, vertical aeroponics farm. Its hyper-locality guarantees that the ingredients that goes into their salad bowls are harvested and delivered at their freshest quality. I am currently with Aerogreens as their lead designer and lead developer. We have just finished creating a website to serve as a landing page and are looking to expand to include online payment systems and customer dashboards. I have also been actively involved in their social media marketing, primarily for Instagram.`
				)
				.animate({ opacity: 1 }, 100);
		});
		lastHovered = feature3;
	}
})