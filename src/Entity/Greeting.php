<?php

namespace App\Entity;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation as API;

/**
 * This is a dummy entity. Remove it!
 *
 * @API\ApiResource
 * @API\ApiFilter(OrderFilter::class, properties={"id", "name"}, arguments={"orderParameterName"="order"})
 * @ORM\Entity
 */
class Greeting
{
    /**
     * @var int The entity Id
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string A nice person
     *
     * @ORM\Column
     * @Assert\NotBlank(message="forms.greetings_create.violations.name.not_blank")
     */
    public $name = '';

    /**
     * @Assert\EqualTo(value="blue", message="forms.greetings_create.violations.radioChoice.not_blue")
     *
     * @var string
     */
    public $radioChoice;

    /**
     * @var bool
     *
     * @Assert\IsTrue(message="forms.greetings_create.violations.testcheck.not_true")
     */
    protected $testcheck = false;

    /**
     * @Assert\NotEqualTo(value="ABBA", message="forms.greetings_create.violations.selectChoice.not_abba")
     *
     * @var string
     */
    public $selectChoice;

    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return bool
     *
     * @Assert\IsTrue(message="forms.greetings_create.violations.orphan.not_true")
     */
    public function isNeverOk() {
        return false;
    }

    /**
     */
    public function setTestcheck($testcheck): void
    {
        if (is_string($testcheck)) {
            $testcheck = ($testcheck === "on" || $testcheck === "true");
        }

        $this->testcheck = $testcheck;
    }

    /**
     * @return bool
     */
    public function getTestcheck()
    {
        return $this->testcheck;
    }
}
