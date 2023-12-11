// tl.to(dropdown, {
//         maxHeight: isOpen ? `${listItems.length * 40}px` : 0, // Adjust the height as needed
//         opacity: isOpen ? 1 : 0,
//         duration: 0.5,
//         ease: "power2.inOut",
//       });

//       tl.staggerFromTo(
//         listItems,
//         0.3,
//         { opacity: 0, y: -10 },
//         { opacity: 1, y: 0 },
//         0.1,
//         "-=0.2"
//       );

//       if (isOpen) {
//         tl.play();
//       } else {
//         tl.reverse();
//       }
//     }
//   }, [isOpen]);