
import { Link } from "react-router-dom";
import Logo from '../../../public/lovable-uploads/Logo.svg';


export const Footer = () => {
  return (
    <footer
  className="mt-auto  bg-gradient-to-r from-[#e0f7ff] to-[#e6e6fa]"

>
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={Logo} alt="Octans Care" className="max-w-[119px] max-h-[103px] w-full h-auto"
                style={{ height: "103px", width: "119px" }}
              />
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Making healthcare accessible. Find the right provider and book appointments with ease.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-health-500 transition-colors">Home</Link></li>
              <li><Link to="/providers" className="text-muted-foreground hover:text-health-500 transition-colors">Find Providers</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-health-500 transition-colors">Services</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-health-500 transition-colors">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-muted-foreground hover:text-health-500 transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-health-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-health-500 transition-colors">FAQs</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-health-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Healthcare Ave</li>
              <li>Auckland, New Zealand</li>
              <li>contact@octanscare.com</li>
              <li>+64 1234 5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Octans Care. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-health-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-health-500 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-health-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>
       
      </div>
     
    </footer>
  );
};


// import { Link } from "react-router-dom";
// import Logo from '../../../public/lovable-uploads/Logo.svg';

// export const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-[#9dbbcc] via-[#054a7b] to-[#169c8d] mt-auto">
//       <div className="container py-12 md:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="md:col-span-1">
//             <Link to="/" className="flex items-center gap-2 mb-4">
//               <img src={Logo} alt="Octans Care" className="max-w-[119px] max-h-[103px] w-full h-auto"
//                 style={{ height: "103px", width: "119px" }}
//               />
//             </Link>
//             <p className="text-white max-w-xs">
//               Making healthcare accessible. Find the right provider and book appointments with ease.
//             </p>
//           </div>

//           <div>
//             <h3 className="font-medium text-lg mb-4 text-white">Quick Links</h3>
//             <ul className="space-y-2">
//               <li><Link to="/" className="text-white hover:text-[#169c8d] transition-colors">Home</Link></li>
//               <li><Link to="/providers" className="text-white hover:text-[#169c8d] transition-colors">Find Providers</Link></li>
//               <li><Link to="/services" className="text-white hover:text-[#169c8d] transition-colors">Services</Link></li>
//               <li><Link to="/how-it-works" className="text-white hover:text-[#169c8d] transition-colors">How It Works</Link></li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-medium text-lg mb-4 text-white">Support</h3>
//             <ul className="space-y-2">
//               <li><Link to="/help" className="text-white hover:text-[#169c8d] transition-colors">Help Center</Link></li>
//               <li><Link to="/contact" className="text-white hover:text-[#169c8d] transition-colors">Contact Us</Link></li>
//               <li><Link to="/faq" className="text-white hover:text-[#169c8d] transition-colors">FAQs</Link></li>
//               <li><Link to="/terms" className="text-white hover:text-[#169c8d] transition-colors">Terms of Service</Link></li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-medium text-lg mb-4 text-white">Contact</h3>
//             <ul className="space-y-2 text-white">
//               <li>123 Healthcare Ave</li>
//               <li>Auckland, New Zealand</li>
//               <li>contact@octanscare.com</li>
//               <li>+64 1234 5678</li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-white text-sm">
//             © {new Date().getFullYear()} Octans Care. All rights reserved.
//           </p>
//           <div className="flex gap-6 mt-4 md:mt-0">
//             <Link to="/privacy" className="text-sm text-white hover:text-[#169c8d] transition-colors">Privacy Policy</Link>
//             <Link to="/terms" className="text-sm text-white hover:text-[#169c8d] transition-colors">Terms of Service</Link>
//             <Link to="/cookies" className="text-sm text-white hover:text-[#169c8d] transition-colors">Cookie Policy</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };
