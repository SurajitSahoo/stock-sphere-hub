import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, TrendingUp, FileText, LogOut, Warehouse } from "lucide-react";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Warehouse className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">WareTrack</span>
        </div>
        
        <nav className="flex items-center gap-1">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            activeClassName="bg-primary/10 text-primary"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </NavLink>
          
          <NavLink
            to="/prediction"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            activeClassName="bg-primary/10 text-primary"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Prediction</span>
          </NavLink>
          
          <NavLink
            to="/report"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            activeClassName="bg-primary/10 text-primary"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Report</span>
          </NavLink>
        </nav>

        <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
