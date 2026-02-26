/**
 * Страница /dashboards – само пренасочване към /product-catalog.
 * Покрива възможна грешка при писане (dashboards вместо product-catalog).
 * Ако пречи – може да се изтрие, тогава /dashboards ще даде 404.
 */
import { redirect } from "next/navigation";

export default function DashboardsPage() {
  redirect("/product-catalog");
}
