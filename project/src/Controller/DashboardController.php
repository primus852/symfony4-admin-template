<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function home()
    {

        return $this->redirectToRoute('overview');

    }

    /**
     * @Security("has_role('ROLE_USER')")
     * @Route("/admin/overview", name="overview")
     */
    public function overview()
    {
        return $this->render('blank.html.twig', array());
    }
}
